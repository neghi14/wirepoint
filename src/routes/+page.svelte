<script lang="ts">
    import { onMount } from "svelte";
    import { Accordion } from "bits-ui";
    import {
        IconBrandFacebookFilled,
        IconBrandInstagram,
        IconBrandTiktok,
        IconBrandX,
    } from "@tabler/icons-svelte";
    import { faqs, featureCards, testimonials } from "$lib/data";
    import appStore from "$lib/assets/appStore.svg";
    import convertToCheque from "$lib/assets/convert-to-cheque.png";
    import depositCashFull from "$lib/assets/deposit-cash-full.png";
    import girlHoldingPhone from "$lib/assets/girl-holding-phone.png";
    import girlSmilling from "$lib/assets/girl-smilling.png";
    import globeDot from "$lib/assets/globe-dot.png";
    import handHoldingPhone from "$lib/assets/hand-holding-phone.png";
    import playStore from "$lib/assets/playStore.svg";
    import tetherIcon from "$lib/assets/tether-icon.png";
    import trackStatus from "$lib/assets/track-status.png";
    import wirepointLogo from "$lib/assets/wirepoint-logo.png";
    import wirepointLogoLight from "$lib/assets/wirepoint-logo-light.png";

    let smoothWrapper: HTMLDivElement;
    let smoothContent: HTMLDivElement;
    let heroSection: HTMLElement;
    let heroImage: HTMLImageElement;
    let testimonialTrack: HTMLDivElement;
    let smootherInstance:
        | {
              scrollTo: (
                  target: Element,
                  smooth?: boolean,
                  position?: string,
              ) => void;
              kill: () => void;
          }
        | undefined;

    const scrollToHero = () => {
        if (smootherInstance && heroSection) {
            smootherInstance.scrollTo(heroSection, true, "top top");
            return;
        }

        heroSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    onMount(() => {
        let cleanup = () => {};

        const setupScroll = async () => {
            const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }] =
                await Promise.all([
                    import("gsap"),
                    import("gsap/ScrollTrigger"),
                    import("gsap/ScrollSmoother"),
                ]);

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

            gsap.from("[data-hero-line]", {
                yPercent: 110,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
                delay: 0.15,
            });

            gsap.from(heroImage, {
                autoAlpha: 0,
                y: 24,
                duration: 1,
                ease: "power2.out",
                delay: 0.45,
            });

            smootherInstance = ScrollSmoother.create({
                wrapper: smoothWrapper,
                content: smoothContent,
                smooth: 1.35,
                smoothTouch: 0.2,
                normalizeScroll: false,
                ignoreMobileResize: true,
            });

            const matchMedia = gsap.matchMedia();
            let testimonialTween:
                | {
                      kill: () => void;
                  }
                | undefined;

            const startTestimonialScroll = () => {
                if (!testimonialTrack) return;

                testimonialTween?.kill();
                gsap.set(testimonialTrack, { x: 0 });

                const distance = testimonialTrack.scrollWidth / 2;
                testimonialTween = gsap.to(testimonialTrack, {
                    x: -distance,
                    duration: distance / 45,
                    ease: "none",
                    repeat: -1,
                });
            };

            matchMedia.add("(min-width: 1024px)", () => {
                const panels =
                    gsap.utils.toArray<HTMLElement>("[data-pin-panel]");

                panels.forEach((panel, index) => {
                    const card =
                        panel.querySelector<HTMLElement>("[data-pin-card]");

                    gsap.set(panel, { zIndex: index + 1 });
                    gsap.set(card, {
                        scale: 1,
                        autoAlpha: 1,
                        force3D: true,
                        transformOrigin: "center center",
                        willChange: "transform",
                    });

                    ScrollTrigger.create({
                        trigger: panel,
                        start: "top top",
                        end: () =>
                            `+=${window.innerHeight * (panels.length - index)}`,
                        pin: true,
                        pinSpacing: index === panels.length - 1,
                        anticipatePin: 1,
                    });

                    if (index < panels.length - 1) {
                        gsap.to(card, {
                            scale: 0.92,
                            ease: "power1.out",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top top",
                                end: "+=100%",
                                scrub: 0.9,
                            },
                        });
                    }
                });

                if (panels.length > 1) {
                    ScrollTrigger.create({
                        trigger: panels[0],
                        start: "top top",
                        end: () =>
                            `+=${window.innerHeight * (panels.length - 1)}`,
                        snap: {
                            snapTo: 1 / (panels.length - 1),
                            duration: { min: 0.2, max: 0.6 },
                            delay: 0.04,
                            ease: "power2.out",
                        },
                    });
                }
            });

            startTestimonialScroll();
            window.addEventListener("resize", startTestimonialScroll);

            ScrollTrigger.refresh();

            cleanup = () => {
                window.removeEventListener("resize", startTestimonialScroll);
                testimonialTween?.kill();
                matchMedia.revert();
                smootherInstance?.kill();
                smootherInstance = undefined;
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        };

        setupScroll();

        return () => cleanup();
    });
</script>

<header class="fixed inset-x-0 top-0 z-50 bg-white">
    <div class="container flex h-20 items-center justify-between">
        <img
            src={wirepointLogo}
            alt="Wirepoint"
            class="h-6 w-auto sm:h-[29px]"
        />

        <button
            type="button"
            class="rounded-lg bg-primary px-5 py-2 lg:px-7 lg:py-3 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]"
            onclick={scrollToHero}
        >
            Get the app
        </button>
    </div>
</header>

<div bind:this={smoothWrapper}>
    <div bind:this={smoothContent} class="pt-20">
        <section
            bind:this={heroSection}
            class="overflow-hidden py-12 sm:py-16 lg:py-20"
        >
            <div
                class="container relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,32rem)]"
            >
                <div class="grid gap-8 max-w-140">
                    <h1
                        class="grid overflow-hidden font-display text-[2.2rem] font-bold leading-11 sm:text-[3.2rem] sm:leading-[3.8rem]"
                        aria-label="Turn your USD cash and cheques into Naira instantly."
                    >
                        <span class="overflow-hidden">
                            <span data-hero-line class="block"
                                >Turn your USD cash</span
                            >
                        </span>
                        <span class="overflow-hidden">
                            <span data-hero-line class="block"
                                >and cheques into</span
                            >
                        </span>
                        <span class="overflow-hidden">
                            <span data-hero-line class="block"
                                >Naira instantly.</span
                            >
                        </span>
                    </h1>
                    <p
                        class="font-sans text-base font-normal leading-7 text-[#50555C] sm:text-lg"
                    >
                        Got USD cash or dollar cheques? Convert them to Naira
                        seamlessly with Wirepoint. Enjoy secure processing,
                        competitive exchange rates, fast payouts, and a
                        hassle-free experience that puts your funds within
                        reach.
                    </p>
                    <div class="flex flex-wrap items-center gap-3">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.wirepoint.app"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Get it on Google Play"
                            class="transition-transform duration-200 hover:-translate-y-1"
                        >
                            <img
                                src={playStore}
                                alt="Get it on Google Play"
                                class="h-[45px] w-auto"
                            />
                        </a>
                        <a
                            href="https://apps.apple.com/app/wirepoint/id6782949706"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Download on the App Store"
                            class="transition-transform duration-200 hover:-translate-y-1"
                        >
                            <img
                                src={appStore}
                                alt="Download on the App Store"
                                class="h-[45px] w-auto"
                            />
                        </a>
                    </div>
                </div>
                <div
                    class="flex justify-center lg:justify-end -mb-12 sm:-mb-16 lg:-mb-20"
                >
                    <img
                        bind:this={heroImage}
                        src={handHoldingPhone}
                        alt="Hand holding a phone with the Wirepoint app"
                        class="w-full max-w-md lg:max-w-lg relative max-sm:left-15 max-lg:left-25"
                    />
                </div>
            </div>
        </section>
        <section class="bg-primary py-16 sm:py-20 lg:py-32">
            <div
                class="container grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,29.375rem)]"
            >
                <div class="grid gap-4 max-w-140">
                    <h2
                        class="font-display text-3xl font-bold leading-10 text-white sm:text-4xl sm:leading-12.5"
                    >
                        The Smarter Way to Process USD Cash and Cheques.
                    </h2>
                    <p
                        class="text-base font-normal leading-7 text-white sm:text-lg"
                    >
                        Convert your USD cheques and physical USD cash into
                        Naira with Wirepoint. Enjoy secure processing,
                        competitive rates, transparent transactions, and fast,
                        reliable payouts every time.
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    {#each featureCards as card}
                        <div
                            class="grid aspect-470/387 w-full content-between rounded-[1.25rem] bg-[radial-gradient(circle_at_17%_10%,rgba(255,218,218,0.9)_0%,rgba(255,238,238,0.74)_28%,rgba(255,255,255,0.98)_72%),linear-gradient(135deg,#ffe2e2_0%,#fff6f6_42%,#ffffff_100%)] p-4 sm:p-6"
                        >
                            <img
                                src={card.image}
                                alt=""
                                class="mx-auto h-28 w-28 object-contain"
                            />
                            <h3
                                class="font-sans text-base font-medium text-black sm:text-lg"
                            >
                                {card.title}
                            </h3>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
        <section
            data-pin-panel
            class="py-16 sm:py-20 lg:flex lg:min-h-dvh lg:items-center lg:py-0"
        >
            <div class="container">
                <div
                    data-pin-card
                    class="relative min-h-[32rem] overflow-hidden rounded-3xl bg-gray-03 px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-32"
                >
                    <div class="relative z-10 grid max-w-sm gap-6">
                        <h2
                            class="font-display text-3xl font-bold leading-10 text-black sm:text-4xl sm:leading-12"
                        >
                            Turn your Physical USD cash to Naira
                        </h2>
                        <p
                            class="text-base leading-7 text-[#676C74] sm:text-lg"
                        >
                            Mail physical cash securely to WirePoint and receive
                            the Naira equivalent once we verify your deposit.
                        </p>
                    </div>
                    <img
                        src={globeDot}
                        alt="globe-dot"
                        class="absolute -right-36 -bottom-2 w-176 max-w-none opacity-80 lg:-right-12 lg:-bottom-2 lg:w-216"
                    />
                </div>
            </div>
        </section>
        <section
            data-pin-panel
            class="py-16 sm:py-20 lg:flex lg:min-h-dvh lg:items-center lg:py-0"
        >
            <div class="container">
                <div
                    data-pin-card
                    class="grid overflow-hidden rounded-3xl bg-gray-03 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14"
                >
                    <div
                        class="relative min-h-[22rem] overflow-hidden rounded-3xl bg-white sm:min-h-[27rem] lg:min-h-[28rem]"
                    >
                        <img
                            src={convertToCheque}
                            alt="Cheque deposit screen in the Wirepoint app"
                            class="absolute left-1/2 w-3xs bottom-0 max-w-none -translate-x-1/2"
                        />
                    </div>
                    <div class="grid max-w-md gap-6 pt-10 lg:pt-0">
                        <h2
                            class="font-display text-3xl font-bold leading-10 text-black sm:text-4xl sm:leading-12 lg:text-[2.75rem] lg:leading-[3.25rem]"
                        >
                            Convert Your USD Cheque to Naira
                        </h2>
                        <p
                            class="text-base leading-7 text-[#676C74] sm:text-lg"
                        >
                            Mail a US cheque to WirePoint, snap a photo in the
                            app, and track it all the way to a Naira payout.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section
            data-pin-panel
            class="py-16 sm:py-20 lg:flex lg:min-h-dvh lg:items-center lg:py-0"
        >
            <div class="container">
                <div
                    data-pin-card
                    class="grid overflow-hidden rounded-3xl bg-dark p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14"
                >
                    <div class="grid max-w-md gap-6 py-6 lg:py-0 lg:pl-6">
                        <h2
                            class="font-display text-3xl font-bold leading-10 text-white sm:text-4xl sm:leading-12 lg:text-[2.75rem] lg:leading-[3.25rem]"
                        >
                            Track your transactions
                        </h2>
                        <p class="text-base leading-7 text-white/80 sm:text-lg">
                            Follow your transaction with confidence. Wirepoint
                            keeps you informed from submission to successful
                            Naira payout.
                        </p>
                    </div>
                    <div
                        class="relative min-h-[22rem] overflow-hidden rounded-3xl bg-white sm:min-h-[27rem] lg:min-h-[28rem]"
                    >
                        <img
                            src={trackStatus}
                            alt="Transaction tracking status screen in the Wirepoint app"
                            class="absolute left-1/2 w-3xs bottom-0 max-w-none -translate-x-1/2"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section
            data-pin-panel
            class="py-16 sm:py-20 lg:flex lg:min-h-dvh lg:items-center lg:py-0 bg-white"
        >
            <div class="container">
                <div
                    data-pin-card
                    class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-start"
                >
                    <h2
                        class="font-display text-3xl font-bold leading-10 text-black sm:text-4xl sm:leading-12 lg:text-[2.75rem] lg:leading-[3.25rem]"
                    >
                        Powering Secure USD Transactions
                    </h2>
                    <p class="text-base leading-7 text-[#676C74] sm:text-lg">
                        Wirepoint delivers secure, transparent, and reliable USD
                        cheque and cash processing, ensuring fast Naira payouts
                        with confidence and convenience.
                    </p>
                </div>

                <div class="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr_1.3fr]">
                    <div
                        class="relative min-h-[32rem] overflow-hidden rounded-lg bg-gray-03"
                    >
                        <img
                            src={depositCashFull}
                            alt="Cash deposit screen in the Wirepoint app"
                            class="absolute left-1/2 bottom-[-10rem] w-69 max-w-none -translate-x-1/2"
                        />
                    </div>

                    <div class="grid gap-4">
                        <div
                            class="relative min-h-[15rem] overflow-hidden rounded-lg bg-gray-03 p-6 sm:p-8"
                        >
                            <h3
                                class="font-display text-xl font-bold leading-7 text-black sm:text-2xl sm:leading-8"
                            >
                                Trade Crypto with
                                <span class="block text-[#707783]"
                                    >Wirepoint</span
                                >
                            </h3>
                            <p
                                class="mt-8 text-base leading-7 text-[#676C74] sm:text-lg"
                            >
                                Make every crypto transaction count. Convert to
                                Naira through Wirepoint with speed.
                            </p>
                            <img
                                src={tetherIcon}
                                alt=""
                                class="absolute right-[-0.5rem] bottom-[-0.5rem] w-28"
                            />
                        </div>

                        <div
                            class="relative min-h-[16rem] overflow-hidden rounded-lg bg-[#fff0f2]"
                        >
                            <img
                                src={girlSmilling}
                                alt="Smiling Wirepoint customer"
                                class="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[20rem]"
                            />
                        </div>
                    </div>

                    <div
                        class="relative min-h-[32rem] overflow-hidden rounded-lg"
                    >
                        <img
                            src={girlHoldingPhone}
                            alt="Customer holding a phone"
                            class="absolute inset-0 h-full w-full object-cover"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70"
                        ></div>
                        <p
                            class="absolute right-8 bottom-8 left-8 text-base leading-6 text-white sm:text-lg"
                        >
                            Every transaction is backed by security,
                            transparency, and trusted service.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-primary py-16 text-white sm:py-20 lg:py-32">
            <div
                class="container grid gap-14 lg:grid-cols-[minmax(20rem,30rem)_minmax(0,1fr)] lg:items-start lg:gap-28"
            >
                <div class="grid gap-8">
                    <h2
                        class="font-display text-3xl font-bold leading-10 sm:text-4xl sm:leading-12 lg:text-[2.75rem] lg:leading-[3.25rem]"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p
                        class="max-w-md text-base leading-7 text-white/90 sm:text-lg sm:leading-8"
                    >
                        Got USD cash or dollar cheques? Convert them to Naira
                        seamlessly with Wirepoint. Enjoy secure processing,
                        competitive exchange
                    </p>
                    <div class="flex flex-wrap items-center gap-4">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.wirepoint.app"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Get it on Google Play"
                            class="transition-transform duration-200 hover:-translate-y-1"
                        >
                            <img
                                src={playStore}
                                alt="Get it on Google Play"
                                class="h-[45px] w-auto"
                            />
                        </a>
                        <a
                            href="https://apps.apple.com/app/wirepoint/id6782949706"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Download on the App Store"
                            class="transition-transform duration-200 hover:-translate-y-1"
                        >
                            <img
                                src={appStore}
                                alt="Download on the App Store"
                                class="h-[45px] w-auto"
                            />
                        </a>
                    </div>
                </div>

                <Accordion.Root type="single" class="w-full">
                    {#each faqs as faq}
                        <Accordion.Item
                            value={faq.question}
                            class="border-b border-white/55"
                        >
                            <Accordion.Header level={3}>
                                <Accordion.Trigger
                                    class="group flex w-full items-center justify-between gap-6 py-5 text-left text-base leading-7 text-white sm:text-lg"
                                >
                                    <span>{faq.question}</span>
                                    <span
                                        class="text-2xl leading-none transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    >
                                        ⌄
                                    </span>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content
                                class="pb-5 text-base leading-7 text-white/85"
                            >
                                {faq.answer}
                            </Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>
            </div>
        </section>

        <section class="overflow-hidden bg-gray-01 py-16 sm:py-20 lg:py-32">
            <div class="container">
                <div class="grid max-w-4xl gap-6">
                    <h2
                        class="font-display text-3xl font-bold leading-10 text-black sm:text-4xl sm:leading-12 lg:text-[2.75rem] lg:leading-[3.25rem]"
                    >
                        Why Customer Use Wirepoint
                    </h2>
                    <p
                        class="max-w-3xl text-base leading-7 text-[#7A818C] sm:text-lg"
                    >
                        Hear from customers who trust Wirepoint for fast,
                        secure, and reliable transactions. Whether cashing USD
                        cheques, converting physical USD cash, or exchanging
                        crypto to Naira, Wirepoint helps them access their funds
                        with confidence, transparency, and ease.
                    </p>
                </div>
            </div>

            <div class="mt-16 overflow-hidden">
                <div
                    bind:this={testimonialTrack}
                    class="flex w-max gap-4 px-4 pb-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
                >
                    {#each [...testimonials, ...testimonials] as testimonial, index}
                        <article
                            aria-hidden={index >= testimonials.length}
                            class="grid min-h-[20rem] w-[min(26rem,85vw)] shrink-0 content-between rounded-lg bg-white p-6 sm:p-8"
                        >
                            <p
                                class="text-base leading-6 text-[#1A1A1A] sm:text-lg"
                            >
                                {testimonial.quote}
                            </p>
                            <div class="grid gap-1">
                                <h3
                                    class="text-base font-bold text-black sm:text-lg"
                                >
                                    {testimonial.name}
                                </h3>
                                <p class="text-base text-[#1A1A1A]">
                                    {testimonial.role}
                                </p>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <footer
            class="relative overflow-hidden bg-dark py-16 text-white sm:py-20 lg:py-24"
        >
            <div
                class="container relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:gap-20"
            >
                <div class="grid max-w-lg gap-7">
                    <img
                        src={wirepointLogoLight}
                        alt="Wirepoint"
                        class="h-6 w-auto sm:h-[29px]"
                    />
                    <p class="max-w-md text-lg leading-8 text-white/50">
                        Receive money from the US via wire, cheque, or cash
                        settled in Naira or USD. Banking that moves with you.
                    </p>
                    <p class="text-lg leading-8 text-white/50">
                        Wirepoint Limited · RC 8805292<br />
                        3F87+M6R, Wuse, Abuja 904101, FCT, Nigeria
                    </p>
                </div>

                <div class="grid content-start gap-6">
                    <h2 class="text-lg font-bold text-white">Talk to us</h2>
                    <p class="text-lg text-white/80 underline">
                        Support@Wirepoint.com
                    </p>
                    <div class="flex items-center gap-3">
                        <button
                            type="button"
                            class="grid size-8 place-items-center rounded-full bg-white text-dark transition-transform duration-200 hover:-translate-y-1"
                            aria-label="Wirepoint on X"
                        >
                            <IconBrandX size={18} stroke={2.5} />
                        </button>
                        <button
                            type="button"
                            class="grid size-8 place-items-center rounded-full bg-white text-dark transition-transform duration-200 hover:-translate-y-1"
                            aria-label="Wirepoint on Facebook"
                        >
                            <IconBrandFacebookFilled size={18} />
                        </button>
                        <button
                            type="button"
                            class="grid size-8 place-items-center rounded-full bg-white text-dark transition-transform duration-200 hover:-translate-y-1"
                            aria-label="Wirepoint on Instagram"
                        >
                            <IconBrandInstagram size={18} stroke={2.5} />
                        </button>
                        <button
                            type="button"
                            class="grid size-8 place-items-center rounded-full bg-white text-dark transition-transform duration-200 hover:-translate-y-1"
                            aria-label="Wirepoint on TikTok"
                        >
                            <IconBrandTiktok size={18} stroke={2.5} />
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="pointer-events-none relative inset-x-0 bottom-[-7rem] hidden items-end justify-center gap-10 opacity-[0.06] lg:flex"
                aria-hidden="true"
            >
                <div class="flex gap-5">
                    <span
                        class="block h-44 w-24 -skew-x-[18deg] rounded-[3rem] bg-white"
                    ></span>
                    <span
                        class="block h-44 w-24 -skew-x-[18deg] rounded-[3rem] bg-white"
                    ></span>
                    <span
                        class="block h-44 w-24 -skew-x-[18deg] rounded-[3rem] bg-white"
                    ></span>
                </div>
                <span class="font-display text-[9rem] font-bold leading-none">
                    Wirepoint
                </span>
            </div>
        </footer>
    </div>
</div>
