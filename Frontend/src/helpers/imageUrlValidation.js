import { Messages } from '../components/shared/configs/messages';

export const validateImageURL = async (value) => {
    if (!value) return true;

    try {
        const response = await fetch(value, { method: 'HEAD' });

        // Some servers don't support HEAD, fallback to GET if needed
        const contentType = response.headers.get('content-type');

        if (response.ok && contentType && contentType.startsWith('image/')) {
            return true;
        }

        // If HEAD failed or doesn't return content-type, use GET request just to get headers
        if (response.status === 405 || !contentType) {
            const getResponse = await fetch(value, { method: 'GET' });
            const getContentType = getResponse.headers.get('content-type');
            if (getResponse.ok && getContentType && getContentType.startsWith('image/')) {
                return true;
            }
        }

        throw new Error(Messages.register.ERR_IMAGE_URL);
    } catch (error) {
        throw new Error(Messages.register.ERR_IMAGE_URL, error)
    }
};
