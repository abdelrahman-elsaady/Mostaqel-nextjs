import React from 'react'

export default async function Portfolio({params}) {
    let portfolio = [];

    try {
        const res = await fetch(`${process.env.BASE_URL}/portfolio/freelancer/${params.id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch portfolio data');
        }

        const text = await res.text();
        if (text) {
            portfolio = JSON.parse(text);
        }
    } catch (error) {
        console.error('Error fetching portfolio:', error);
    }

    console.log(portfolio);

    return (
        <div>
            {Array.isArray(portfolio) && portfolio.length > 0 ? (
                <div className='row'>

                    {portfolio.map((portfolio) => (
                    <div key={portfolio._id} className=' col-md-3 col-sm-6 col-xs-12 mb-3  '>

                        <div className='portfolio-item'>    
                            <img src={portfolio.image} alt={portfolio.title} className='img-fluid' style={{width: '100%', height: 200}} />
                        </div>
                        <div className='portfolio-title'>
                            {portfolio.title}
                        </div>
                    </div>


                    
                    ))}
                </div>

            ) : (
                <div>لا يوجد اعمال بعد</div>
            )}
        </div>
    )
}