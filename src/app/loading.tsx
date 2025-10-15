'use client'

import React from 'react';

const Loading = () => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-background"
        >
            <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
            ></div>
        </div>
    );
};

export default Loading;