// Application data with sophisticated white/gray/black/blue palette
const applicationData = {
  investment_metrics: {
    capital_required: "$5,000,000",
    timeline: "36 months", 
    projected_roi: "168.9%",
    return_multiple: "2.7x",
    total_revenue: "$13,406,250"
  },
  market_growth_data: [
    {year: 2024, value: 6.54},
    {year: 2025, value: 7.23}, 
    {year: 2026, value: 7.99},
    {year: 2027, value: 8.82},
    {year: 2028, value: 9.75},
    {year: 2029, value: 10.77}, 
    {year: 2030, value: 11.91}
  ],
  revenue_streams: [
    {
      name: "US Platform Licensing",
      percentage: 35,
      amount: "$5.6M",
      description: "Direct licensing agreements with major platforms"
    },
    {
      name: "Revenue Share Agreements", 
      percentage: 27.2,
      amount: "$4.4M",
      description: "Ongoing participation in content performance"
    },
    {
      name: "International Distribution",
      percentage: 21,
      amount: "$3.4M", 
      description: "Global licensing across multiple territories"
    },
    {
      name: "Franchise Development",
      percentage: 16.8,
      amount: "$2.7M",
      description: "Sequel and adaptation rights monetization"
    }
  ],
  color_palette: {
    pure_white: "#FFFFFF",
    light_gray: "#F8F9FA",
    medium_light_gray: "#E9ECEF",
    medium_gray: "#6C757D",
    dark_gray: "#495057",
    charcoal: "#343A40",
    near_black: "#212529",
    blue_accent: "#0066CC",
    light_blue: "#E3F2FD"
  }
};

// Navigation functionality with smooth scrolling
class Navigation {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.navBar = document.querySelector('.nav-bar');
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupScrollSpy();
    this.setupScrollEffects();
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Update active state immediately
          this.updateActiveNavLink(targetId.substring(1));
        }
      });
    });
  }

  setupScrollSpy() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            this.updateActiveNavLink(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
      }
    );

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  setupScrollEffects() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 10);
    });
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
      this.navBar.style.background = 'rgba(255, 255, 255, 0.98)';
      this.navBar.style.boxShadow = '0 4px 20px rgba(52, 58, 64, 0.1)';
      this.navBar.style.backdropFilter = 'blur(25px)';
    } else {
      this.navBar.style.background = 'rgba(255, 255, 255, 0.95)';
      this.navBar.style.boxShadow = 'none';
      this.navBar.style.backdropFilter = 'blur(20px)';
    }
  }

  updateActiveNavLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// Chart implementations with sophisticated white/gray/black/blue palette
class ChartManager {
  constructor() {
    this.charts = {};
    this.colors = applicationData.color_palette;
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded before creating charts
    setTimeout(() => {
      this.createMarketGrowthChart();
      this.createRevenueChart();
    }, 500);
  }

  createMarketGrowthChart() {
    const ctx = document.getElementById('marketGrowthChart');
    if (!ctx) return;

    const data = applicationData.market_growth_data;
    
    this.charts.marketGrowth = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.year),
        datasets: [{
          label: 'Market Size ($B)',
          data: data.map(d => d.value),
          borderColor: this.colors.blue_accent,
          backgroundColor: `${this.colors.blue_accent}15`,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: this.colors.charcoal,
          pointBorderColor: this.colors.pure_white,
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 12,
          pointHoverBackgroundColor: this.colors.blue_accent,
          pointHoverBorderColor: this.colors.pure_white,
          pointHoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: this.colors.charcoal,
            titleColor: this.colors.pure_white,
            bodyColor: this.colors.pure_white,
            borderColor: this.colors.blue_accent,
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Market Size: $${context.parsed.y}B`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: `${applicationData.color_palette.medium_gray}20`,
              drawBorder: false
            },
            ticks: {
              color: this.colors.dark_gray,
              font: {
                size: 12,
                weight: '500'
              }
            }
          },
          y: {
            grid: {
              color: `${applicationData.color_palette.medium_gray}15`,
              drawBorder: false
            },
            ticks: {
              color: this.colors.dark_gray,
              font: {
                size: 12,
                weight: '500'
              },
              callback: function(value) {
                return '$' + value + 'B';
              }
            }
          }
        }
      }
    });
  }

  createRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    const data = applicationData.revenue_streams;
    const colors = [this.colors.blue_accent, this.colors.medium_gray, this.colors.medium_light_gray, this.colors.near_black];
    
    this.charts.revenue = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.name),
        datasets: [{
          data: data.map(d => d.percentage),
          backgroundColor: colors,
          borderColor: this.colors.pure_white,
          borderWidth: 4,
          hoverOffset: 15,
          hoverBorderWidth: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: this.colors.charcoal,
            titleColor: this.colors.pure_white,
            bodyColor: this.colors.pure_white,
            borderColor: this.colors.blue_accent,
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                const item = data[context.dataIndex];
                return `${item.name}: ${item.percentage}% (${item.amount})`;
              }
            }
          }
        },
        cutout: '65%',
        animation: {
          animateRotate: true,
          duration: 2000,
          easing: 'easeInOutCubic'
        }
      }
    });
  }
}

// Animation controller for scroll-based animations
class AnimationController {
  constructor() {
    this.observedElements = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupTableRowAnimations();
    this.setupMetricCardAnimations();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
            this.observedElements.add(entry.target);
            
            if (entry.target.classList.contains('fundamental-item')) {
              this.animateFundamentalItems(entry.target);
            } else if (entry.target.classList.contains('highlight-item')) {
              this.animateHighlightItems(entry.target);
            } else if (entry.target.classList.contains('pillar-card')) {
              this.animatePillarCards(entry.target);
            } else if (entry.target.classList.contains('team-member')) {
              this.animateTeamMembers(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animatable elements
    document.querySelectorAll('.fundamental-item, .highlight-item, .pillar-card, .team-member').forEach(element => {
      observer.observe(element);
    });
  }

  animateFundamentalItems(item) {
    const index = parseInt(item.dataset.index) || 0;
    const delay = index * 150;
    
    setTimeout(() => {
      item.classList.add('animate');
    }, delay);
  }

  animateHighlightItems(item) {
    const index = parseInt(item.dataset.index) || 0;
    const delay = index * 100;
    
    setTimeout(() => {
      item.classList.add('animate');
    }, delay);
  }

  animatePillarCards(card) {
    const cards = document.querySelectorAll('.pillar-card');
    const index = Array.from(cards).indexOf(card);
    const delay = index * 200;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay);
  }

  animateTeamMembers(member) {
    const members = document.querySelectorAll('.team-member');
    const index = Array.from(members).indexOf(member);
    const delay = index * 150;
    
    setTimeout(() => {
      member.style.opacity = '1';
      member.style.transform = 'translateY(0) scale(1)';
    }, delay);
  }

  setupTableRowAnimations() {
    const tableRows = document.querySelectorAll('.financial-table tbody tr');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
            this.observedElements.add(entry.target);
            const row = entry.target;
            const delay = parseInt(row.dataset.year) * 200;
            setTimeout(() => {
              row.classList.add('animate');
            }, delay);
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    tableRows.forEach(row => {
      observer.observe(row);
    });
  }

  setupMetricCardAnimations() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    // Set initial states
    metricCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
    });
    
    // Animate on page load
    setTimeout(() => {
      metricCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
      });
    }, 1000);
  }
}

// Interactive elements and button functionality
class InteractionManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtonInteractions();
    this.setupCardHoverEffects();
    this.setupParallaxEffects();
  }

  setupButtonInteractions() {
    setTimeout(() => {
      const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
      
      ctaButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', (e) => {
          this.createRippleEffect(e, button);
          
          setTimeout(() => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('Schedule')) {
              this.showNotification('Due diligence review scheduling will be available soon. Please contact our investment team directly for immediate scheduling.', 'info');
            } else if (buttonText.includes('Download')) {
              this.showNotification('Full investment deck download will be available soon. Please contact our team for immediate access to the complete materials.', 'info');
            }
          }, 200);
        });
      });
    }, 500);
  }

  createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      background-color: rgba(255, 255, 255, 0.6);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (button.contains(ripple)) {
        button.removeChild(ripple);
      }
    }, 600);
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.metric-card, .fundamental-item, .pillar-card, .team-member, .highlight-item, .revenue-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-diagonal, .opportunity-diagonal, .strategy-diagonal');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.3;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      document.body.removeChild(existingNotification);
    }

    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-header">
          <h3 style="margin: 0; color: ${applicationData.color_palette.charcoal}; font-size: 1.1rem; font-weight: 600;">Information</h3>
          <button class="notification-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: ${applicationData.color_palette.medium_gray};">&times;</button>
        </div>
        <p style="margin: 16px 0 24px 0; color: ${applicationData.color_palette.dark_gray}; line-height: 1.6; font-size: 1rem;">${message}</p>
        <button class="btn btn--primary btn--sm close-notification">Close</button>
      </div>
    `;
    
    // Styles with sophisticated palette
    notification.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(52, 58, 64, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(12px);
      opacity: 0;
      animation: fadeInNotification 0.4s ease-out forwards;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
      background: ${applicationData.color_palette.pure_white};
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(52, 58, 64, 0.2);
      max-width: 500px;
      width: 90%;
      text-align: center;
      border: 2px solid ${applicationData.color_palette.light_blue};
      transform: translateY(-20px) scale(0.9);
      animation: slideInNotification 0.4s ease-out 0.1s forwards;
    `;

    const notificationHeader = notification.querySelector('.notification-header');
    notificationHeader.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    `;

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInNotification {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInNotification {
        from { 
          transform: translateY(-20px) scale(0.9);
          opacity: 0;
        }
        to { 
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
      @keyframes fadeOutNotification {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.close-notification');
    const closeX = notification.querySelector('.notification-close');
    
    [closeBtn, closeX].forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeNotification(notification);
      });
    });
    
    notification.addEventListener('click', (e) => {
      if (e.target === notification) {
        this.closeNotification(notification);
      }
    });

    // Auto close after 8 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        this.closeNotification(notification);
      }
    }, 8000);
  }

  closeNotification(notification) {
    notification.style.animation = 'fadeOutNotification 0.3s ease-out forwards';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }
}

// Performance optimizations and lazy loading
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.optimizeAnimations();
    this.setupReducedMotion();
  }

  setupLazyLoading() {
    // Lazy load charts when they come into view
    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.loaded) {
            entry.target.dataset.loaded = 'true';
            console.log('Chart container loaded:', entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    document.querySelectorAll('.chart-container').forEach(container => {
      chartObserver.observe(container);
    });
  }

  optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update any scroll-based animations here
    // Keep animations lightweight and performant
  }

  setupReducedMotion() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable animations for users who prefer reduced motion
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Vertical Series Content Licensing Application with Sophisticated White/Gray/Black/Blue Design...');
  
  try {
    // Initialize navigation immediately
    new Navigation();
    
    // Initialize charts with a small delay for DOM readiness
    setTimeout(() => {
      new ChartManager();
    }, 300);
    
    // Initialize animations and interactions
    setTimeout(() => {
      new AnimationController();
      new InteractionManager();
      new PerformanceOptimizer();
    }, 600);
    
    // Initialize additional styling for elements that need it
    this.initializeElementStyles();
    
    console.log('✅ Application initialized successfully with sophisticated professional design!');
  } catch (error) {
    console.error('❌ Error initializing application:', error);
  }
});

// Initialize element styles that need JavaScript
function initializeElementStyles() {
  // Set initial opacity for elements that will be animated
  const elementsToAnimate = document.querySelectorAll('.pillar-card, .team-member');
  elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px) scale(0.95)';
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
}

// Handle window resize for responsive charts and layouts
window.addEventListener('resize', () => {
  // Chart.js handles resize automatically with responsive: true
  // Add any custom responsive logic here if needed
  console.log('Window resized - charts and layouts automatically adjusted');
});

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('🎉 All assets loaded - sophisticated professional application ready for interaction!');
});