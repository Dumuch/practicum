export default (content: string | null): string => {
    if (!content) {
        return '';
    }

    try {
        const obContent = JSON.parse(content);
        return obContent?.message ?? '';
    } catch {
        return '';
    }
};
