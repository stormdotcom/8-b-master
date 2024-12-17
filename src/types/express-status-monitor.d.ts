declare module 'express-status-monitor' {
    import { RequestHandler } from 'express';

    interface MonitorOptions {
        title?: string;
        path?: string;
        websocket?: any;
        spans?: Array<{ interval: number; retention: number }>;
        chartVisibility?: {
            cpu?: boolean;
            mem?: boolean;
            load?: boolean;
            heap?: boolean;
            responseTime?: boolean;
            rps?: boolean;
            statusCodes?: boolean;
        };
        healthChecks?: Array<{ protocol: string; host: string; path: string; port: number }>;
        ignoreStartsWith?: string;
    }

    function statusMonitor(options?: MonitorOptions): RequestHandler;

    export = statusMonitor;
}
