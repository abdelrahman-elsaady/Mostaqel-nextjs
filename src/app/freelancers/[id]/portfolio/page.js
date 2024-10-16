import React from 'react'
import axios from 'axios';

export default async function Portfolio({params}) {
    let portfolio = [];

    try {
        const response = await axios.get(`${process.env.BASE_URL}/users/${params.id}`);
        portfolio = response.data.data.portfolio;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
    }

    // console.log(portfolio.data.portfolio);

    return (
        <div>
            {portfolio.length > 0 ? (
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