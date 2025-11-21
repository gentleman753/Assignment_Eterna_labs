import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-screen bg-[#020203] flex items-center justify-center p-8">
                    <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-6 max-w-2xl">
                        <h1 className="text-red-500 text-2xl font-bold mb-4">Application Error</h1>
                        <pre className="text-zinc-300 text-sm overflow-auto">
                            {this.state.error?.toString()}
                            {'\n\n'}
                            {this.state.error?.stack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
