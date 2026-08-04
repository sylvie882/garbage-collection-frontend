'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://api.sylviegarbagecollection.co.ke';


interface FAQ {
  id: number;
  question: string;
  answer: string;
}


export default function FaqSection() {

  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    fetchFaqs();
  }, []);



  const fetchFaqs = async () => {

    try {

      setError(null);


      const res = await fetch(
        `${API_URL}/api/faqs`
      );


      if (!res.ok) {

        throw new Error('Failed to fetch');

      }


      const data: FAQ[] = await res.json();


      setFaqs(data);


    } catch (err) {


      setError(
        'Failed to load FAQs.'
      );


    } finally {


      setLoading(false);


    }

  };




  const toggle = (index:number) => {


    setActiveIndex(

      activeIndex === index
      ? null
      : index

    );


  };





  if (loading) {

    return (

      <section className="py-20 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4">

          <div
            className="
              h-10
              bg-slate-200
              rounded-xl
              animate-pulse
              w-64
              mx-auto
            "
          />

        </div>

      </section>

    );

  }





  return (

    <section
      id="faq"
      className="
        py-20
        bg-slate-50
      "
    >


      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          lg:px-8
        "
      >



        <div
          className="
            grid
            lg:grid-cols-2
            gap-14
            items-center
          "
        >





          {/* FAQ LEFT */}

          <div>


            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-green-600
                mb-3
              "
            >
              Common Questions
            </p>




            <h2

              className="
                text-4xl
                font-bold
                text-slate-900
                mb-5
              "

              style={{
                fontFamily:"'Fraunces', serif"
              }}

            >

              Frequently Asked{" "}

              <span className="text-green-700">
                Questions
              </span>

            </h2>




            <p
              className="
                text-slate-500
                mb-8
                leading-relaxed
              "
            >

              Find answers about waste collection,
              sanitary bins, pricing and our service areas.

            </p>





            {error ? (


              <div
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-8
                  text-center
                "
              >


                <p className="text-slate-500 mb-5">
                  {error}
                </p>



                <button

                  onClick={fetchFaqs}

                  className="
                    bg-green-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                  "

                >

                  Try Again

                </button>


              </div>



            ) : (



              <div className="space-y-4">



                {faqs.map((faq,index)=>(



                  <div

                    key={faq.id}

                    className="
                      bg-white
                      rounded-2xl

                      border
                      border-slate-100

                      shadow-[0_8px_30px_rgba(0,0,0,0.06)]

                      hover:shadow-[0_15px_40px_rgba(22,163,74,0.12)]

                      transition-all

                      overflow-hidden
                    "

                  >



                    <button

                      onClick={() => toggle(index)}

                      className="
                        w-full
                        px-6
                        py-5

                        flex
                        justify-between
                        items-center
                        gap-4

                        text-left
                      "

                    >



                      <span
                        className="
                          font-semibold
                          text-slate-900
                          text-sm
                        "
                      >

                        {faq.question}

                      </span>




                      <span

                        className={`
                          flex
                          items-center
                          justify-center

                          w-9
                          h-9

                          rounded-full

                          bg-green-50

                          text-green-700

                          transition-transform

                          ${
                            activeIndex === index
                            ?
                            'rotate-180 bg-green-700 text-white'
                            :
                            ''
                          }

                        `}

                      >


                        <svg

                          className="w-4 h-4"

                          fill="none"

                          stroke="currentColor"

                          viewBox="0 0 24 24"

                        >

                          <path

                            strokeLinecap="round"

                            strokeLinejoin="round"

                            strokeWidth={2}

                            d="M19 9l-7 7-7-7"

                          />

                        </svg>


                      </span>



                    </button>





                    <div

                      className={`

                        overflow-hidden

                        transition-all

                        duration-300


                        ${
                          activeIndex === index
                          ?
                          'max-h-60'
                          :
                          'max-h-0'
                        }

                      `}

                    >



                      <p

                        className="
                          px-6
                          pb-5
                          text-sm
                          text-slate-500
                          leading-relaxed
                        "

                      >

                        {faq.answer}

                      </p>



                    </div>



                  </div>



                ))}



              </div>



            )}




          </div>






          {/* IMAGE RIGHT */}


          <div className="relative">



            <div

              className="
                absolute
                -inset-5

                bg-green-100

                rounded-3xl

                blur-xl

                opacity-50
              "

            />




            <div

              className="
                relative

                rounded-3xl

                overflow-hidden

                shadow-[0_25px_70px_rgba(0,0,0,0.18)]
              "

            >



              <img

                src="/images/images1.png"

                alt="Waste Management"

                className="
                  w-full

                  h-[600px]

                  object-cover

                  hover:scale-105

                  transition-transform

                  duration-700
                "

              />



            </div>





            <div

              className="
                absolute

                bottom-8

                left-8

                right-8

                bg-white/95

                backdrop-blur

                rounded-2xl

                shadow-xl

                p-6
              "

            >



              <h3

                className="
                  font-bold
                  text-lg
                  text-slate-900
                  mb-2
                "

                style={{
                  fontFamily:"'Fraunces', serif"
                }}

              >

                Need Help?

              </h3>




              <p

                className="
                  text-sm
                  text-slate-500
                  mb-4
                "

              >

                Our team is ready to answer your waste
                management questions.

              </p>





              <div className="flex gap-3">



                <a

                  href="tel:+254711515752"

                  className="
                    flex-1
                    bg-green-700
                    text-white
                    text-center
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                  "

                >

                  Call Us

                </a>





                <a

                  href="/quote"

                  className="
                    flex-1
                    bg-orange-500
                    text-white
                    text-center
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                  "

                >

                  Quote

                </a>




              </div>




            </div>





          </div>





        </div>



      </div>



    </section>

  );

}