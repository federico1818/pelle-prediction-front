export interface Dialogue {
    text: string
    src: string
    type?: 'video' | 'image'
    loop?: boolean
}