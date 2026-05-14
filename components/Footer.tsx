import Link from "next/link";
import Image from "next/image";
import ContactForm from "./ContactForm";

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Content", href: "/#content" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/colebonawitz" },
  { label: "GitHub", href: "https://github.com/colebonawitz" },
  { label: "Email", href: "mailto:colebonawitz@gmail.com" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Contact
          </h3>
          <div className="w-16 h-px bg-accent mt-4 mb-4" />
          <p className="text-muted text-base max-w-2xl mb-6">
            Send me a message and it will open an email to
            {" "}
            <a href="mailto:colebonawitz@gmail.com" className="text-foreground hover:text-accent transition-colors">
              colebonawitz@gmail.com
            </a>
            .
          </p>
          <ContactForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl text-foreground">
              <span className="inline-flex items-center justify-center w-12 h-12 bg-background">
                <Image
                  src="/images/cblogo.png"
                  alt="CB logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </span>
              <span>Cole Bonawitz</span>
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
              Open to startup internships, founder&apos;s office roles,
              product/growth roles, and accelerator conversations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {social.label}
                </a>
              ))}
              <a
                href="/Cole_Bonawitz_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Cole Bonawitz
          </p>
          <p className="text-xs text-muted">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
