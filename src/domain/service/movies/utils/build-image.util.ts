import { envs } from "../../../../config/env"


export const buildImageUr = (imageName: string | null): string | null =>{
    const baseUrl = envs.IMAGE_BASE_URL || '';
    return imageName ? `${baseUrl}/${imageName}` : null;
}