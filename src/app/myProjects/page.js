





'use client';




import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdPerson2, MdOutlineLocalActivity } from 'react-icons/md';
import { BiAlarm } from 'react-icons/bi';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
//   const router = useRouter();
  const cookies = new Cookies();
  let token = cookies.get('token');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

if (!token) {
    // router.push('/login');
    return;
}

      const fetchProjects = async () => {
        
            try {
                let decodedToken = jwtDecode(token);
                // const decodedToken = jwt.decode(token);
                setUserId(decodedToken.id);
        //   const userId = decodedToken.id;

        const response = await fetch(`${process.env.BASE_URL}/projects/client/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProjects(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };


    fetchProjects();
  }, [userId]);

  const formatDateArabic = (dateString) => {
    // Implement your date formatting logic here
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  if (loading) {
    return  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">جاري التحميل...</span>
    </div>
  </div>

  }

  return (
    <div className="container my-5" dir='rtl'>
      <h2 className="mb-4">مشاريعي</h2>
      <div className="list-group">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link href={`/project/details/${project._id}`} key={project._id} className="list-group-item list-group-item-action p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link className="mb-1" href={`/project/details/${project._id}`} style={{ textDecoration: 'none', color: "#2386c8" }}>{project.title}</Link>
                <h5 className='btn btn-sm btn-primary'>{project.status === 'closed' ? 'مغلق' : 'مفتوح'}</h5>
              </div>

              <div className="mb-3" style={{fontSize: 12}}>
                <small className="">
                  <MdPerson2 />
                  {project.client.firstName}
                </small>

                <small className="pe-3">
                  <BiAlarm />
                  {project.createdAt ? formatDateArabic(project.createdAt) : 'Unknown Date'}
                </small>

                <small className="pe-3">
                  <MdOutlineLocalActivity />
                  {project.proposals.length > 0 ? `${project.proposals.length} عرض` : 'أضف أول عرض'}
                </small>
              </div>
              <p className="mb-1">{project.description}</p>
            </Link>
          ))
        ) : (
          <p>لا توجد مشاريع حالياً</p>
        )}
      </div>
    </div>
  );
}






