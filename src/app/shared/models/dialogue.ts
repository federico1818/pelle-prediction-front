export interface Dialogue {
    text: string
    src: string
    type?: 'video' | 'image' | 'rpg'
    loop?: boolean
    character?: string
}