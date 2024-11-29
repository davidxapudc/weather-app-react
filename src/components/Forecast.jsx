
// Forecast component displaying forecast data for a given title and data
function Forecast({ title, data }) {
    return (
        <>
            <div className='flex items-center justify-start mt-6'>
                <p className='font-medium uppercase'>{title}</p>
            </div>
            <hr className="my-1" />
            <div className="flex items-center justify-between">
                {data.map((d, index) => (
                    <div key={index} className="flex flex-col justify-center">
                        <p className="font-light text-sm">{d.title}</p>
                        <img src={d.icon} alt="" className="w-12 my-1" />
                        <p className="font-medium">{`${d.temp.toFixed()}`}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Forecast;