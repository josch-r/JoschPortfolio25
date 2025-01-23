export default function Home() {
  return (
    <div className="p-8 space-y-6">
      <p className="text-caption">text-caption (11px geist regular)</p>
      <p className="text-body-small">text-body-small (14px geist regular)</p>
      <h3 className="text-heading-small">text-heading-small (14px geist bold)</h3>
      <p className="text-body">text-body (16px geist regular)</p>
      <h2 className="text-heading-medium">text-heading-medium (16px geist bold)</h2>
      <a href="#" className="text-link block">
        text-link (18px geist medium)
      </a>
      <p className="text-hero">text-hero (24px geist medium)</p>
      <h1 className="text-heading-large">text-heading-large (36px geist medium)</h1>
    </div>
  )
}

