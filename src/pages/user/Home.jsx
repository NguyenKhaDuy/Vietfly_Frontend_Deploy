import HeroSlider from "../../components/user/HeroSlider";
import TravelValues from "../../components/user/TravelValues";
import FeaturedTours from "../../components/user/FeaturedTours";
import CustomTourRequest from "../../components/user/CustomTourRequest";

function Home() {
  return (
    <main className="bg-slate-50">
      {/* HERO */}
      <HeroSlider />

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-600">
              VietFly Travel
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kiến tạo hành trình,
              <br />
              <span className="text-cyan-600">
                kết nối những trải nghiệm đáng nhớ.
              </span>
            </h2>
          </div>

          <p className="text-justify max-w-xl text-base leading-7 text-slate-500 lg:ml-auto">
            Mỗi chuyến đi không chỉ là một điểm đến, mà là cơ hội để bạn chạm vào thiên nhiên, cảm nhận văn hóa và lưu giữ những câu chuyện riêng trên từng hành trình.
          </p>
        </div>
      </section>

      {/* GIÁ TRỊ CỐT LÕI */}
      <TravelValues />

      {/* TOUR NỔI BẬT */}
      <FeaturedTours />

      {/* TOUR THEO YÊU CẦU */}
      <CustomTourRequest />
    </main>
  );
}

export default Home;
