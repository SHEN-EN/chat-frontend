export const convertFileSize=(sizeInBytes: number): string=> {
    if (sizeInBytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    const convertedSize = parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(2));

    return convertedSize + " " + sizes[i];
}