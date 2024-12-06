const DateContainer = ({time}: {time: number}) => {
    const timestamp = time * 1000; // Convert to milliseconds
    const now = Date.now(); // Current timestamp in milliseconds
    const diffInMs = now - timestamp;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Format the "time ago" part
    const timeAgo =
        diffInDays === 1 ? `${diffInDays}d ago` : `${diffInDays}d ago`;

    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
        timeZoneName: "short",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions as any).format(
        new Date(timestamp)
    );
    return <span>({timeAgo}) {formattedDate}</span>;
};

export default DateContainer;
