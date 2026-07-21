import { QrCode, X } from 'lucide-react'

interface Props {
    data: string
    title?: string
    open: boolean
    onClose: () => void
}

function QRCodeModal({ data, title, open, onClose }: Props) {
    if (!open) return null

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
            <div className="relative z-10 w-full max-w-sm animate-scale-in rounded-[20px] bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary">{title || 'QR Code'}</h3>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex justify-center">
                    <img
                        src={qrUrl}
                        alt="QR Code"
                        className="h-[300px] w-[300px] rounded-lg"
                    />
                </div>
                <p className="mt-4 text-center text-xs text-text-secondary break-all">{data}</p>
            </div>
        </div>
    )
}

function QRCodeButton({ data, title }: { data: string; title?: string }) {
    return (
        <span
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-[#0B1B3D] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0B1B3D]/90"
        >
            <QrCode className="h-4 w-4" />
            QR
        </span>
    )
}

export default QRCodeModal
export { QRCodeButton }
