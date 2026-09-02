import { Component } from 'ydom-core';
import { signal } from 'ydom-core';

@Component({
  template: './app-root.ydom',
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.25) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 60%);
      pointer-events: none;
    }

    .logo-wrapper {
      margin-bottom: 2rem;
      animation: float 4s ease-in-out infinite;
    }

    .logo {
      width: 96px;
      height: 96px;
      filter: drop-shadow(0 0 32px rgba(99, 102, 241, 0.6));
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #a5b4fc;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.3rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1.5rem;
    }

    .title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #f8fafc 0%, #a5b4fc 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #94a3b8;
      max-width: 520px;
      line-height: 1.65;
      margin: 0 0 2.5rem;
    }

    .counter-card {
      background: rgba(15, 15, 30, 0.7);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 1.25rem;
      padding: 2rem 3rem;
      margin-bottom: 2.5rem;
      backdrop-filter: blur(16px);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      min-width: 280px;
    }

    .counter-label {
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
    }

    .counter-value {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transition: transform 0.15s ease;
    }

    .counter-actions {
      display: flex;
      gap: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      border: none;
      border-radius: 0.65rem;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 0.6rem 1.4rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
    }

    .btn-primary:active {
      transform: translateY(0px);
    }

    .btn-ghost {
      background: rgba(255,255,255,0.06);
      color: #94a3b8;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .btn-ghost:hover {
      background: rgba(255,255,255,0.1);
      color: #e2e8f0;
    }

    .links {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: #64748b;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .link:hover {
      color: #a5b4fc;
    }

    .link svg {
      opacity: 0.6;
    }
  `
})
export class AppRoot {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
