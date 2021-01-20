
export default function classList(...classes: Array<string | boolean | undefined>) {
    return classes
        .filter(item => !!item)
        .join(' ');
}