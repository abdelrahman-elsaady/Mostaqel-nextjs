// ... existing imports ...

// Add this component before your main Home component


export default function FaqAccordion() {

    return (
        <>
        <div className="container">
      <div className="accordion my-5 custom-accordion" id="faqAccordion">
        <div className="text-center mb-5">
          <h2 style={{color: '#2386c8'}}>الأسئلة الشائعة</h2>
        </div>
        
        <div className="accordion-item" >
          <h1 className="accordion-header">
            <button className="accordion-button collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              ما هو مستقل؟
            </button>
          </h1>
          <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              مستقل هو منصة عربية تتيح لأصحاب المشاريع والشركات التعاقد مع مستقلين محترفين للقيام بأعمالهم، وبنفس الوقت يتيح للمستقلين المحترفين مكاناً لإيجاد مشاريع يعملون عليها ويكسبون من خلالها.
            </div>
          </div>
        </div>
  
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              كيف أستفيد منه؟
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              في منصة مستقل تستطيع إضافة مشروعك كإنشاء موقع ويب أو تطبيق جوال أو حتى تصميم شعار وتلقي عروض من المستقلين المحترفين المهتمين بالعمل عليه تقارن بين العروض وتختار أفضلها، ثم تقوم بتوظيف المستقل صاحب أفضل عرض وتتولى المتابعة معه حتى إتمام تنفيذ مشروعك، كما يمكنك البحث بنفسك عن أفضل المستقلين وتعرض عليهم مشروعك بشكل مباشر للعمل عليه.
            </div>
          </div>
        </div>
  
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              كيف يضمن موقع مستقل حقوقي؟
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              موقع مستقل يضمن لك حقك المالي بشكل كامل فلا داعٍ للقلق، كن مطمئنا عند إنشاء أي مشاريع جديدة أو تقديم عروضك على المشاريع الموجودة في الموقع، حيث يقوم موقع مستقل بدور الوسيط بين صاحب المشروع وبين المستقل ويحمي حقوق الطرفين المالية في حال الالتزام بشروط موقع مستقل وبنود الضمان وتوضيح الاتفاق تماماً.
            </div>
          </div>
        </div>
  
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              ما هي المجالات التي يمكنني أن أوظف فيها مستقلين عن بعد؟
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              تلجأ الشركات إلى توظيف العاملين عن بعد في مختلف التخصصات، منها على سبيل المثال لا الحصر العاملين في مجال البرمجة، وتحرير النصوص، والتسويق الإلكتروني، والتصميم والإعلانات، والترجمة وإدخال البيانات، وكتابة المقالات، وبعض أعمال العلاقات العامة عبر الإنترنت، وتصميم المواقع الإلكترونية وإدارة المواقع الإلكترونية، والدراسات والتحاليل السوقية وغيرها من التخصصات.
            </div>
          </div>
        </div>
  
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              ماذا سيحدث بعد نشر مشروعي على مستقل؟
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              بعد نشر مشروعك، سيبقى معلقاً بانتظار المراجعة من قبل الدعم الفني لموقع مستقل. وبعدها إذا تم الموافقة عليه سيصلك إشعار بالموافقة ثم يظهر المشروع لجميع المستقلين للتقدم بعروضهم عليه، أو يتم رفضه مع ذكر الأسباب التي أدت لذلك لكي تقوم بتعديله وإرساله من جديد للمراجعة والقبول.
            </div>
          </div>
        </div>
  
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
              لماذا التوظيف عن بعد عبر مستقل هو الخيار الأفضل لي؟
            </button>
          </h2>
          <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              في السنوات الأخيرة انتشر على الصعيد العالمي نظام التوظيف عن بُعد، حيث تلجأ العديد من الشركات والمؤسسات - وكذلك الأفراد - إلى الاستعانة بأفراد يعملون عن بُعد من المنزل أو أي مكان في العالم عبر الإنترنت. التوظيف عن بعد لا يعترف بوجود الحدود الجغرافية، فبإمكانك توظيف مستقلين موهوبين ومبدعين من كل أنحاء العالم، ليعمل كل واحد منهم من المكان المفضل بالنسبة له وفي الأوقات التي يحددها لنفسه، وبذلك ستتوفر للموظفين كافة العوامل الداعمة للإنتاج، وستوفر الشركات ميزات منها انخفاض التكلفة وتوفير جزء كبير من المال مع زيادة الإنتاجية، بالإضافة إلى الراحة الجسدية والنفسية.
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
  };
  

    // ... existing code ...
  
   