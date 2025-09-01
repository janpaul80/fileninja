#!/bin/bash

echo "🚀 Starting FileNinja Development Servers..."
echo

echo "📦 Installing dependencies..."
npm run install:all

echo
echo "🔥 Starting servers..."
npm run dev
