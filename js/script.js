document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.classList.toggle('active');
  });
  
  // Dropdown menu toggle for mobile
  dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      
      link.addEventListener('click', function(e) {
          if (window.innerWidth <= 992) {
              e.preventDefault();
              dropdown.classList.toggle('active');
          }
      });
  });
  
  // Navigation system - show only the active section
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  // Function to show a specific section and hide others
  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === sectionId) {
        section.classList.add('active');
      }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
    
    // Scroll to the section
    const targetElement = document.querySelector(`#${sectionId}`);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  }
  
  // Set home as default active section
  showSection('home');
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showSection(targetId);
      
      // Close mobile menu if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  });
  
  // Handle direct URL hash navigation
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      showSection(sectionId);
    }
  });
  
  // Scroll animation for sections
  const animateOnScroll = function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialize section animations
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});

// Help Center functionality
document.querySelectorAll('.help-category').forEach(category => {
    category.addEventListener('click', function() {
        // Remove active class from all categories
        document.querySelectorAll('.help-category').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to clicked category
        this.classList.add('active');
        
        // Hide all article categories
        document.querySelectorAll('.help-article-category').forEach(articleCat => {
            articleCat.classList.remove('active');
        });
        
        // Show the selected article category
        const categoryId = this.getAttribute('data-category');
        document.getElementById(`${categoryId}-articles`).classList.add('active');
    });
});

// Article item toggle
document.querySelectorAll('.article-item h4').forEach(articleHeader => {
    articleHeader.addEventListener('click', function() {
        const articleItem = this.parentElement;
        articleItem.classList.toggle('active');
    });
});


// Account Modal Functionality
const accountModal = document.getElementById('account-modal');
const userIconBtn = document.querySelector('.user-icon-btn');
const tabBtns = document.querySelectorAll('.tab-btn');

// Open modal when user icon clicked
userIconBtn.addEventListener('click', () => {
  accountModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

// Close modal when clicking outside
accountModal.addEventListener('click', (e) => {
  if (e.target === accountModal) {
    accountModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Tab switching
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active tab content
    const tabId = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// Feedback Form Submission
document.querySelector('#feedback form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('feedback-name').value;
  const email = document.getElementById('feedback-email').value;
  const type = document.getElementById('feedback-type').value;
  const message = document.getElementById('feedback-message').value;
  
  // Here you would typically send this data to your server
  console.log('Feedback submitted:', { name, email, type, message });
  
  // Show success message
  alert('Thank you for your feedback! Ka ED appreciates your input.');
  
  // Reset form
  this.reset();

  // Update your existing tab switching code with this
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active tab content
    const tabId = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// Add switch tab functionality for footer link
document.querySelectorAll('.switch-tab').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabId = link.getAttribute('data-tab');
    
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

const supabaseUrl = 'https://hsjzfhzvqcxyzpvjhywo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzanpmaHp2cWN4eXpwdmpoeXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTI3MzksImV4cCI6MjA2MzIyODczOX0.uGdpzDXmsacdqi6pmH-aTzN1e2U4jK0ang3ySCJO1yY';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error loading products:', error);
  } else {
    console.log('Products:', data);
  }
}
loadProducts();
});
