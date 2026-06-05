import { cva } from "class-variance-authority";

const testimonialVariants = cva("relative", {
    variants: {
        variant: {
            base: "bg-black/5",
            dark: "bg-black text-white border border-white/10",
            light: "bg-white text-black border border-gray-200 shadow-md",
            glass: "bg-black/80 text-white backdrop-blur-xl border border-white/10",
        },
    },
    defaultVariants: {
        variant: "base",
    },
});

export default function TestimonialCard({
    quote,
    author,
    role,
    image,
    variant,
    //   size = "md",
    theme = "base",
    className = "",
}) {
    const resolvedVariant = variant || (theme === "light" ? "light" : theme === "dark" ? "dark" : theme === "glass" ? "glass" : "base");

    return (
        <div className={`p-5 rounded-xl ${testimonialVariants({ variant: resolvedVariant, })} w-full ${className}`.trim()}>
            {/* Decorative quote */}
            <div className="absolute left-0 translate-y-[-50%] top-0 w-full max-w-12">
                <svg width="100%" height="100%" viewBox="0 0 49 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M49 36C48.1224 32.2776 47.196 28.2612 46.2209 23.951C45.2458 19.6408 44.3682 15.4286 43.5881 11.3143C42.808 7.2 42.1741 3.42857 41.6866 0H27.791L26.7672 1.61633C27.6448 5.0449 28.7662 8.71837 30.1313 12.6367C31.4965 16.6531 33.008 20.6694 34.6657 24.6857C36.3234 28.702 37.9323 32.4735 39.4925 36H49ZM21.9403 36C21.0627 32.2776 20.1363 28.2612 19.1612 23.951C18.1861 19.6408 17.3085 15.4286 16.5284 11.3143C15.7483 7.2 15.1144 3.42857 14.6269 0H0.877612L0 1.61633C0.877612 5.0449 1.99901 8.71837 3.36418 12.6367C4.72935 16.6531 6.19204 20.6694 7.75224 24.6857C9.40995 28.702 11.0189 32.4735 12.5791 36H21.9403Z" fill="#C5C1B9" />
                </svg>

            </div>

            {/* Content */}
            <div className="flex min-h-inherit flex-col justify-between gap-12">
                <div className="flex-col flex gap-3 items-start justify-start">
                    <blockquote className="text-lg md:text-base leading-tight text-left">
                        {quote}
                    </blockquote>
                    <p className="text-sm text-black/60">
                        by {author} · Adiveda
                    </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 justify-start">
                    <div className="h-10 w-10 rounded-full object-cover border border-black">
                        <img
                            src={image}
                            alt={author}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <div>
                        <h4 className="text-lg">{author}</h4>

                        {role && (
                            <p className="text-sm text-black/60">
                                {role}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}