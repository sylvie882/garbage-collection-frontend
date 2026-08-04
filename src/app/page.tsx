import Carousel from '../components/Carousel';
import Link from 'next/link';
import { Service } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import FloatingButtons from '../components/FloatingButtons';
import CookieConsent from '../components/CookieConsent';
import FaqSection from '@/components/FaqSection';

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch('https://api.sylviegarbagecollection.co.ke/api/services', { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export const metadata = {
  title: 'Sanitary Bins, Bin Bags & Garbage Collection Kenya | Sylvie',
  description: "Sylvie supplies sanitary bins, bin bags, and reliable garbage collection across Nairobi, Nakuru, Narok, Laikipia and 500+ locations in Kenya. Free quotes, 24/7 support, eco-friendly disposal.",
  keywords: [
    'sanitary bins Kenya', 'sanitary bins Nairobi', 'bin bags Kenya', 'bin bags Nairobi',
    'garbage collection Kenya', 'garbage collection Nairobi', 'waste collection Kenya',
    'waste management Kenya', 'sanitary bin rental Kenya', 'buy bin bags Kenya',
  ],
  openGraph: {
    title: 'Sanitary Bins, Bin Bags & Garbage Collection Kenya | Sylvie',
    description: 'Reliable sanitary bins, bin bags, and garbage collection across Kenya. Serving Nairobi, Nakuru, Narok, Laikipia and 500+ locations.',
    type: 'website',
    locale: 'en_KE',
  },
};

const seoLocations = {
  nairobi: ['The New Horse Shoe Village','Barton Estate','Whispers Estate','Migaa Golf Estate','Daisy Road','Tara Road','Fairview Estate','Riverrun Estates','Amani Ridge'],
  nakuru: ['Milimani Estate','Kiamunyi Estate','Naka Estate','Ngata Estate','Section 58 Estate','Villa View Estate'],
  narok: ['Kilgoris','Emurua Dikirr','Narok North','Narok East','Narok West','Narok South'],
  laikipia: ['Laikipia West','Laikipia East','Laikipia North','Nanyuki','Dol Dol','Rumuruti'],
};

export default async function Home() {
  const services = await getServices();
  const displayedServices = services.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="sr-only" aria-hidden="true">
        <h1>Sanitary Bins, Bin Bags &amp; Garbage Collection Kenya - Sylvie Waste Collection</h1>
        <p>Sylvie supplies and services sanitary bins and bin bags for homes, offices, schools and hospitals across Kenya, alongside reliable garbage collection.</p>
        {Object.entries(seoLocations).map(([county, locs]) => (
          <p key={county}>{county}: {locs.join(', ')}</p>
        ))}
      </div>

      <Header />

      {/* Hero Carousel */}
      <section className="w-full pt-0">
        <Carousel />
      </section>

      {/* Stats strip */}
      <div className="bg-green-800">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-green-700">
          {[
            { n: '500+', l: 'Locations Served' },
            { n: '1,000+', l: 'Happy Clients' },
            { n: '24/7', l: 'Support' },
            { n: '100%', l: 'Eco-Friendly' },
          ].map((s) => (
            <div key={s.l} className="text-center px-4 py-1">
              <div className="text-xl font-bold text-white" style={{ fontFamily: "'Fraunces', serif" }}>{s.n}</div>
              <div className="text-xs text-green-200 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sanitary Bins & Bin Bags — priority keyword section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">

    <div className="text-center mb-12">
      <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">
        Our Most Requested Services
      </p>

      <h2
        className="text-4xl font-bold text-slate-900 mb-3"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Sanitary Bins &amp;{" "}
        <span className="text-green-700">Bin Bags</span> in Kenya
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Sylvie supplies, rents and services sanitary bins and bin bags for
        homes, offices, schools, hospitals and factories across Kenya, with
        scheduled servicing and disposal certificates included.
      </p>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


      {/* Sanitary Bins Card */}
      <Link
        href="/sanitary-bins"
        className="
          group relative overflow-hidden
          rounded-3xl
          bg-white
          p-8
          border border-green-100
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          hover:shadow-[0_20px_60px_rgba(22,163,74,0.18)]
          hover:-translate-y-2
          transition-all duration-500
        "
      >

        {/* Glow effect */}
        <div
          className="
            absolute -top-20 -right-20
            w-48 h-48
            bg-green-100
            rounded-full
            opacity-50
            group-hover:scale-150
            transition-transform duration-700
          "
        />


        <div className="relative z-10">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-green-100
              flex items-center justify-center
              mb-6
              group-hover:bg-green-600
              transition-colors duration-300
            "
          >
            <svg
              className="w-7 h-7 text-green-700 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>


          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
              mb-3
              group-hover:text-green-800
              transition-colors
            "
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Sanitary Bins
          </h3>


          <p className="text-slate-500 leading-relaxed mb-6">
            Pedal and automatic sanitary bin rental and servicing across all
            47 counties — hygienic, discreet, and compliant washroom solutions
            for businesses and homes.
          </p>


          <span
            className="
              inline-flex items-center gap-2
              text-sm font-bold
              text-green-700
            "
          >
            Get Sanitary Bins

            <svg
              className="
                w-4 h-4
                group-hover:translate-x-2
                transition-transform
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

          </span>

        </div>

      </Link>




      {/* Bin Bags Card */}
      <Link
        href="/bin-bags"
        className="
          group relative overflow-hidden
          rounded-3xl
          bg-white
          p-8
          border border-green-100
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          hover:shadow-[0_20px_60px_rgba(22,163,74,0.18)]
          hover:-translate-y-2
          transition-all duration-500
        "
      >

        <div
          className="
            absolute -top-20 -right-20
            w-48 h-48
            bg-green-100
            rounded-full
            opacity-50
            group-hover:scale-150
            transition-transform duration-700
          "
        />


        <div className="relative z-10">


          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-green-100
              flex items-center justify-center
              mb-6
              group-hover:bg-green-600
              transition-colors duration-300
            "
          >

            <svg
              className="w-7 h-7 text-green-700 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7h16M4 7l2 14h12l2-14M9 7V4h6v3"
              />
            </svg>

          </div>


          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
              mb-3
              group-hover:text-green-800
              transition-colors
            "
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Bin Bags
          </h3>


          <p className="text-slate-500 leading-relaxed mb-6">
            Durable, leak-proof bin bags in bulk for households and businesses,
            delivered across Nairobi, Nakuru, Narok, Laikipia and beyond.
          </p>


          <span
            className="
              inline-flex items-center gap-2
              text-sm font-bold
              text-green-700
            "
          >
            Shop Bin Bags

            <svg
              className="
                w-4 h-4
                group-hover:translate-x-2
                transition-transform
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

          </span>


        </div>

      </Link>


    </div>

  </div>
</section>


      {/* Why us */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-12 items-center">


      {/* LEFT IMAGE */}
      <div className="relative">

        <div
          className="
            absolute
            -inset-4
            bg-green-100
            rounded-3xl
            blur-xl
            opacity-50
          "
        />

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            shadow-[0_25px_60px_rgba(0,0,0,0.15)]
          "
        >

          <img
            src="/images/images1.png"
            alt="Sylvie Waste Management"
            className="
              w-full
              h-[650px]
              object-cover

              hover:scale-105
              transition-transform
              duration-700
            "
          />

        </div>


        {/* Floating stat */}
        <div
          className="
            absolute
            bottom-8
            left-8
            bg-white
            rounded-2xl
            px-6
            py-4
            shadow-xl
          "
        >

          <h3 className="
            text-3xl
            font-bold
            text-green-700
          ">
            500+
          </h3>

          <p className="
            text-sm
            text-slate-500
          ">
            Service Locations
          </p>

        </div>


      </div>




      {/* RIGHT CONTENT */}
      <div>


        <div className="mb-10">

          <p className="
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-green-600
            mb-3
          ">
            Why Choose Sylvie
          </p>


          <h2
            className="
              text-4xl
              lg:text-5xl
              font-bold
              text-slate-900
              mb-4
            "
            style={{
              fontFamily:"'Fraunces', serif"
            }}
          >

            The Smart Choice for{" "}
            <span className="text-green-700">
              Waste Management
            </span>

          </h2>


          <p className="
            text-slate-500
            leading-relaxed
          ">
            Kenya's premier digital waste management company
            providing modern solutions for homes and businesses.
          </p>


        </div>



        <div className="
          grid
          sm:grid-cols-2
          gap-6
        ">


          {[
            {
              title:"Digital First",
              desc:"Schedule pickups, view invoices and make payments through our smart platform.",
              icon:"💻",
              glow:"bg-blue-100",
              bg:"from-blue-50"
            },

            {
              title:"Eco-Friendly",
              desc:"Committed to 100% recycling and sustainable disposal across all service areas.",
              icon:"🌱",
              glow:"bg-green-100",
              bg:"from-green-50"
            },

            {
              title:"24/7 Support",
              desc:"Round-the-clock customer support for all your waste management needs.",
              icon:"☎️",
              glow:"bg-orange-100",
              bg:"from-orange-50"
            },

            {
              title:"Wide Coverage",
              desc:"500+ locations across Nairobi, Nakuru, Narok and Laikipia counties.",
              icon:"📍",
              glow:"bg-purple-100",
              bg:"from-purple-50"
            },

            {
              title:"Transparent Pricing",
              desc:"Competitive rates with no hidden charges for residential and commercial clients.",
              icon:"💰",
              glow:"bg-teal-100",
              bg:"from-teal-50"
            },

            {
              title:"Certified Team",
              desc:"Trained professionals ensuring safe, compliant waste handling every time.",
              icon:"✓",
              glow:"bg-amber-100",
              bg:"from-amber-50"
            }

          ].map((f,i)=>(


            <div
              key={i}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl

                bg-gradient-to-br
                ${f.bg}
                to-white

                border
                border-slate-100

                p-6

                shadow-[0_10px_35px_rgba(0,0,0,0.07)]

                hover:-translate-y-2

                hover:shadow-[0_25px_60px_rgba(22,163,74,0.18)]

                transition-all
                duration-500
              `}
            >


              {/* Glow */}
              <div
                className={`
                  absolute
                  -top-14
                  -right-14
                  w-36
                  h-36
                  rounded-full
                  ${f.glow}

                  opacity-50

                  group-hover:scale-150
                  transition-transform
                  duration-700
                `}
              />


              <div className="relative z-10">


                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-xl
                    mb-5

                    group-hover:scale-110
                    transition-transform
                  "
                >
                  {f.icon}
                </div>


                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                    mb-2

                    group-hover:text-green-700
                    transition-colors
                  "
                  style={{
                    fontFamily:"'Fraunces', serif"
                  }}
                >
                  {f.title}
                </h3>


                <p className="
                  text-sm
                  text-slate-500
                  leading-relaxed
                ">
                  {f.desc}
                </p>


              </div>


            </div>


          ))}


        </div>


      </div>


    </div>

  </div>
</section>


      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Our Services</p>
              <h2 className="text-4xl font-bold text-slate-900" style={{ fontFamily: "'Fraunces', serif" }}>Professional <span className="text-green-700">Solutions</span></h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1 group">
              View all services
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          {displayedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedServices.map((service) => (
                <div key={service.id} className="hover:-translate-y-1 transition-all duration-300">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 mb-6">Our service catalog is being updated. Check back soon.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors">Contact Our Team</Link>
            </div>
          )}
        </div>
      </section>

     {/* Coverage */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">


    {/* Heading */}
    <div className="text-center mb-12">

      <p className="
        text-xs
        font-bold
        uppercase
        tracking-widest
        text-green-600
        mb-2
      ">
        Service Coverage
      </p>


      <h2
        className="
          text-4xl
          font-bold
          text-slate-900
          mb-3
        "
        style={{
          fontFamily:"'Fraunces', serif"
        }}
      >
        Serving{" "}
        <span className="text-green-700">
          All Kenya
        </span>
      </h2>


      <p className="
        text-slate-500
        max-w-xl
        mx-auto
      ">
        Comprehensive waste management across multiple counties with
        reliable local teams.
      </p>

    </div>



    {/* County Cards */}
    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      gap-7
      mb-10
    ">


      {[
        {
          county:"Nairobi County",
          areas:"500+ locations",
          icon:"🏙️",
          href:"/services/nairobi",
          bg:"from-blue-50",
          glow:"bg-blue-100"
        },

        {
          county:"Nakuru County",
          areas:"30+ locations",
          icon:"🏔️",
          href:"/services/nakuru",
          bg:"from-purple-50",
          glow:"bg-purple-100"
        },

        {
          county:"Narok County",
          areas:"6 major areas",
          icon:"🦁",
          href:"/services/narok",
          bg:"from-orange-50",
          glow:"bg-orange-100"
        },

        {
          county:"Laikipia County",
          areas:"6 key locations",
          icon:"🏞️",
          href:"/services/laikipia",
          bg:"from-indigo-50",
          glow:"bg-indigo-100"
        }

      ].map((c,i)=>(


        <Link
          key={i}
          href={c.href}

          className={`
            group
            relative
            overflow-hidden

            rounded-3xl

            bg-gradient-to-br
            ${c.bg}
            to-white

            border
            border-slate-100

            p-7
            text-center

            shadow-[0_10px_35px_rgba(0,0,0,0.07)]

            hover:-translate-y-2

            hover:shadow-[0_25px_60px_rgba(22,163,74,0.18)]

            transition-all
            duration-500
          `}
        >


          {/* Glow */}
          <div
            className={`
              absolute
              -top-14
              -right-14

              w-36
              h-36

              rounded-full

              ${c.glow}

              opacity-50

              group-hover:scale-150

              transition-transform
              duration-700
            `}
          />



          <div className="relative z-10">


            {/* Icon */}
            <div
              className="
                mx-auto

                w-16
                h-16

                rounded-2xl

                bg-white

                shadow-md

                flex
                items-center
                justify-center

                text-3xl

                mb-5

                group-hover:scale-110

                transition-transform
                duration-300
              "
            >
              {c.icon}
            </div>



            <h3
              className="
                text-lg
                font-bold
                text-slate-900

                mb-2

                group-hover:text-green-700

                transition-colors
              "
              style={{
                fontFamily:"'Fraunces', serif"
              }}
            >
              {c.county}
            </h3>



            <p
              className="
                text-sm
                font-semibold
                text-green-600
              "
            >
              {c.areas}
            </p>



            <div
              className="
                mt-5
                mx-auto

                h-1

                w-10

                rounded-full

                bg-green-600

                group-hover:w-20

                transition-all
              "
            />


          </div>


        </Link>


      ))}


    </div>




    {/* CTA */}
    <div
      className="
        relative
        overflow-hidden

        bg-gradient-to-r
        from-green-50
        to-white

        border
        border-green-100

        rounded-3xl

        p-8

        text-center

        shadow-[0_10px_35px_rgba(0,0,0,0.06)]
      "
    >

      <div
        className="
          absolute
          -top-20
          right-10

          w-52
          h-52

          rounded-full

          bg-green-100

          opacity-50
        "
      />


      <div className="relative z-10">


        <p className="
          text-slate-600
          text-sm
          mb-5
        ">
          Not sure if we serve your area? Contact us —
          we are constantly expanding.
        </p>



        <div className="
          flex
          flex-wrap
          gap-3
          justify-center
        ">


          <Link
            href="/contact"
            className="
              bg-green-700
              text-white

              px-7
              py-3

              rounded-xl

              text-sm
              font-semibold

              hover:bg-green-800

              shadow-lg

              transition
            "
          >
            Contact Us
          </Link>



          <Link
            href="/quote"
            className="
              bg-orange-500
              text-white

              px-7
              py-3

              rounded-xl

              text-sm
              font-semibold

              hover:bg-orange-600

              shadow-lg

              transition
            "
          >
            Get Free Quote
          </Link>


        </div>


      </div>


    </div>


  </div>
</section>




      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <section className="py-24 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Fraunces', serif" }}>Ready to Get Started?</h2>
          <p className="text-green-200 text-lg mb-10 leading-relaxed">Join hundreds of satisfied clients across Kenya who trust Sylvie for clean, reliable, eco-friendly waste management.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl text-base">Get Free Quote</Link>
            <Link href="/contact" className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">Contact Us</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 justify-center text-green-300 text-sm">
            {['Free Quote','No Hidden Charges','24/7 Support','Eco-Friendly'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><span className="text-green-400">✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}
