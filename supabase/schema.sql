-- ============================================================================
-- Fileninja — Supabase schema
-- Run in Supabase SQL Editor (or `supabase db push` if using local dev).
-- Idempotent: safe to re-run.
-- ============================================================================

-- 1) profiles table: one row per auth.users, holds plan/billing state
create table if not exists public.profiles (
    id                  uuid primary key references auth.users(id) on delete cascade,
    email               text,
    full_name           text,
    avatar_url          text,
    plan                text not null default 'free'
                        check (plan in ('free','basic','pro')),
    billing_cycle       text check (billing_cycle in ('monthly','yearly')),
    stripe_customer_id  text unique,
    subscription_status text,
    plan_expires_at     timestamptz,
    created_at          timestamptz not null default now(),
    updated_at          timestamptz not null default now()
);

create index if not exists profiles_stripe_customer_id_idx
    on public.profiles (stripe_customer_id);

-- 2) Auto-touch updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();

-- 3) Auto-create profile row when a new auth.users row is inserted
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, email, full_name, plan)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', ''),
        coalesce(new.raw_user_meta_data->>'plan', 'free')
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- 4) Row Level Security
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
    on public.profiles for select
    using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- NOTE: inserts & billing-column updates are performed by the service-role
-- client from API routes, which bypasses RLS.

-- ============================================================================
-- 5) transfers table (future-ready: upload backend will populate these)
-- ============================================================================
create table if not exists public.transfers (
    id             uuid primary key default gen_random_uuid(),
    owner_id       uuid not null references auth.users(id) on delete cascade,
    title          text,
    message        text,
    total_bytes    bigint not null default 0,
    file_count     int not null default 0,
    password_hash  text,
    expires_at     timestamptz,
    download_count int not null default 0,
    created_at     timestamptz not null default now()
);

create index if not exists transfers_owner_id_idx
    on public.transfers (owner_id, created_at desc);

alter table public.transfers enable row level security;

drop policy if exists "transfers_owner_all" on public.transfers;
create policy "transfers_owner_all"
    on public.transfers for all
    using (auth.uid() = owner_id)
    with check (auth.uid() = owner_id);

-- ============================================================================
-- Done. Verify with:
--   select * from public.profiles limit 5;
--   select tgname from pg_trigger where tgrelid = 'auth.users'::regclass;
-- ============================================================================
