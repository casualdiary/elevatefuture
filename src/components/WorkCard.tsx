import { Link } from 'react-router-dom'
import type { Work } from '../data/site'
import { Reveal } from '../lib/motion'

export function WorkCard({ work, index, theme = 'dark' }: { work: Work; index: number; theme?: 'dark' | 'light' }) {
  return (
    <Reveal delay={(index % 2) * 0.12} amount={0.15}>
      <Link to={`/works/${work.slug}`} className="group block text-center">
        <div className="relative aspect-[600/720] overflow-hidden rounded-lg" style={{ backgroundColor: work.bg }}>
          {work.img && work.placement && (
            <img
              src={work.img}
              alt={`${work.name} campaign artwork`}
              loading="lazy"
              className="absolute max-w-none object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
              style={{
                left: `${work.placement.left}%`,
                top: `${work.placement.top}%`,
                width: `${work.placement.width}%`,
                height: `${work.placement.height}%`,
              }}
            />
          )}
          {work.bands && (
            <>
              <div className="absolute inset-x-0 top-0 h-[12.5%] bg-[#d2e4e6]" />
              <div className="absolute inset-x-0 bottom-0 h-[12.2%] bg-[#d2e4e6]" />
            </>
          )}
          {work.logo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/assets/work-lazada-logo.svg"
                alt="Lazada"
                width={306.932}
                height={64.4854}
                className="w-[51%] transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          )}
          <div className="absolute right-5 bottom-5 flex size-14 scale-50 items-center justify-center rounded-full bg-lime opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100">
            <img src="/assets/arrow-orange.svg" alt="" width={18} height={18} className="brightness-0" />
          </div>
        </div>
        <h3 className={`mt-6 font-display text-[22px] font-medium md:mt-[49px] md:text-[24px] ${theme === 'dark' ? 'text-paper' : 'text-ink'}`}>
          {work.name}
        </h3>
        <p className="mt-1.5 font-display text-[18px] font-medium text-muted md:text-[20px]">{work.tag}</p>
      </Link>
    </Reveal>
  )
}
