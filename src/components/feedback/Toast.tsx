import { Toaster } from 'sonner'

function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                className: 'rounded-[12px] shadow-lg border border-border',
            }}
        />
    )
}

Toast.displayName = 'Toast'

export default Toast
