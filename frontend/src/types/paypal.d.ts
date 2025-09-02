declare global {
    interface Window {
        paypal: {
            Buttons: (config: any) => {
                render: (selector: string) => void;
            };
        };
    }
}

export {};
