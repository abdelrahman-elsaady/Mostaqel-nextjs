import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center">
      <div className="row">
        <div className="col-12">
          <h2 className="display-4 mb-3">عذرًا! الصفحة غير موجودة</h2>
          <p className="lead mb-4">لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
          <div className="ratio ratio-16x9 mb-4" style={{maxWidth: '600px'}}>
            <video className="rounded shadow" autoPlay loop controls>
              <source src="/notfound.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Link href="/" className="btn btn-primary btn-lg">
            اطلع من هنا يبابا
          </Link>
        </div>
      </div>
    </div>
  )
}