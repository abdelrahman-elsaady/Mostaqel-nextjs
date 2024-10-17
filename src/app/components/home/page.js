
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { LiaSlidersHSolid } from "react-icons/lia";
import { FaPlusCircle } from "react-icons/fa";


async function fetchUserData(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}


export default async function Home() {


  const cookieStore = cookies();
  const token = cookieStore.get('token');

  let isLoggedIn = false;
  let user = null;

  if (token) {
    isLoggedIn = true;
    let decoded = jwt.decode(token.value);
    if (decoded && decoded.id) {
      const userData = await fetchUserData(decoded.id);
      if (userData) {
        user = userData.data;
      }
    }
  }


  return (
    <>
    <div className='container-fluid py-5' dir='rtl' style={{backgroundColor:'#f0f0f0'}}>
          <h6>الرائيسية</h6>
          <h4 className='fw-bold my-5'>لوحة التحكم</h4>
    <div className='row mb-3'>
 
       <div className="col-md-4 text-center pt-3 bg-white "  >
          <div className="d-flex justify-content-center position-relative">
            <img
              src={user.profilePicture || '/Default-user.png'}
              width={100}
              height={100}
              className="rounded-circle"
              alt={`${user.firstName}`}
            />
          </div>
          <div className="mt-3 border-bottom">
            <h6 className="mt-2">
              {user.firstName} {user.lastName}
            </h6>
          </div>
             <div className='m-3'>
              <Link href='/account/profile' className='text-decoration-none text-muted'>
              <p> <LiaSlidersHSolid className='me-2'/> تعديل الملف الشخصي</p>
              </Link>
             </div>

        </div>

        <div className="col-md-7 bg-white pt-3 mx-3 text-center">
<Link href='/payment' className='text-decoration-none text-muted'>


          <div>

          <div className="row border-bottom py-4">
            <div className="col-md-6 text-center text-muted">
              <div>
                <h3>الرصيد الكلي</h3>
                <h3 className='fw-bold text-success'>${user.totalBalance}.00</h3>
              </div>

            </div>
            <div className="col-md-6 text-center text-muted">

              <div>
                <h3>الرصيد القابل للسحب</h3>
                <h3>${user.withdrawableBalance}.00</h3>
              </div>

            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-6 text-center ">

              <div>
                <span>الرصيد المتاح</span>
                <span> $ {user.availableBalance}.00</span>
              </div>

            </div>
            <div className="col-md-6 text-center ">

              <div>
                <span>الرصيد المعلق</span>
                <span> $ {user.pendingBalance}.00</span>
              </div>

            </div>
          </div>
          

            



        </div>
        </Link>


        </div>
        </div>

  <div className='row'>

  <div className="col-md-4 text-center pt-3 bg-white "  >
          <div className="  text-muted">
               <h4 className='mb-3'>الرسائل</h4>
               <h4>{user.messages.length}</h4>
          </div>
          
             

        </div>
  <div className="col-md-7 text-center mx-3 pt-3 bg-white "  >
    <Link href={`/freelancers/${user._id}/portfolio`} className='text-decoration-none text-muted'>
          <div className=" border-bottom ">
               <h4>اعمالي</h4>
               <h2>{user.portfolio.length}</h2>
          </div>
          </Link>
          <Link href='portifolio/create' className='text-decoration-none text-muted'>
          <div className=" my-3 ">
               <h4 className='text-muted'> <FaPlusCircle className='me-2'/>
               اضف عمل جديد </h4>
          </div>
          </Link>
             

        </div>



  </div>



</div>
 {/* </div> */}
  
    </>
  );
}
