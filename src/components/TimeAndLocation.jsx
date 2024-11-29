// TimeAndLocation component displaying the current time and location
function TimeAndLocation({
    weather: { formattedToLocalTime, name, country },
}) {
    return (
        <>
            <div className="flex items-center justify-center my-6">
                <p className="text-xl font-extralight">
                    {formattedToLocalTime}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-3xl font-medium">
                    {`${name},${country}`}
                </p>
            </div>
        </>
    );
};

export default TimeAndLocation;