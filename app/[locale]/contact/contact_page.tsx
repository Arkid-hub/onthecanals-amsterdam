'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: 'visitor', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/mlgzerel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: form.type,
          company: form.company || '—',
          message: form.message,
        }),
      })

      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-display font-black text-white text-4xl mb-3">Contact</h1>
          <p className="text-white/60">Questions, suggestions or want to list your activity? Get in touch.</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-6">Get in touch</h2>
            <div className="space-y-4 text-sm text-slate-600 mb-8">
              <p className="flex items-start gap-3"><span className="text-xl">📧</span><span>hello@onthecanals.nl</span></p>
              <p className="flex items-start gap-3"><span className="text-xl">📍</span><span>Amsterdam, Netherlands</span></p>
              <p className="flex items-start gap-3"><span className="text-xl">🕐</span><span>Response within 24 hours</span></p>
            </div>

            <div id="provider" className="bg-canal-light border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-canal-dark mb-2">Become a provider?</h3>
              <p className="text-sm text-canal mb-3">Select "I am a provider" in the form and describe your service. We'll get back to you within 24 hours.</p>
              <ul className="text-xs text-canal space-y-1">
                <li>✓ Free to sign up</li>
                <li>✓ Commission-based model</li>
                <li>✓ Manage your own listing</li>
                <li>✓ Direct booking links</li>
              </ul>
            </div>
          </div>

          <div>
            {status === 'sent' ? (
              <div className="bg-white rounded-2xl border border-green-200 p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-canal-dark text-lg mb-2">Message sent!</h3>
                <p className="text-sm text-slate-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-canal bg-stone-50"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-canal bg-stone-50"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">I am a...</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-stone-50 text-slate-700">
                    <option value="visitor">Tourist / visitor</option>
                    <option value="provider">Activity provider</option>
                    <option value="press">Press / journalist</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {form.type === 'provider' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Company name</label>
                    <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-canal bg-stone-50"
                      placeholder="Your company name" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Message *</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-canal bg-stone-50 resize-none"
                    placeholder="How can we help?" />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="w-full bg-amber hover:bg-amber-dark disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
