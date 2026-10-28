import { motion } from 'framer-motion'

type Props<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  id: string
  /** render as links/tabs instead of filter buttons */
  as?: 'filter' | 'tabs'
}

/** Pill filter group from the banners. Active pill = lime with a shared-layout highlight. */
export function FilterChips<T extends string>({ label, options, value, onChange, id, as = 'filter' }: Props<T>) {
  return (
    <div>
      <p className="text-[16px] text-[#7c7c7c]" id={`${id}-label`}>
        {label}
      </p>
      <div
        role={as === 'tabs' ? 'tablist' : 'group'}
        aria-labelledby={`${id}-label`}
        className="mt-[18px] flex flex-wrap gap-4 pl-px lg:max-w-[522px]"
      >
        {options.map((o) => {
          const active = o === value
          return (
            <button
              key={o}
              type="button"
              role={as === 'tabs' ? 'tab' : undefined}
              aria-selected={as === 'tabs' ? active : undefined}
              aria-pressed={as === 'filter' ? active : undefined}
              onClick={() => onChange(o)}
              className="relative rounded-[20px] bg-white px-6 py-[3px] text-[14px] text-ink transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              {active && (
                <motion.span
                  layoutId={`${id}-pill`}
                  className="absolute inset-0 rounded-[20px] bg-lime"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{o}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
