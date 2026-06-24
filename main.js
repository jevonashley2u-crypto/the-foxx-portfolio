import './style.css';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if keys are present
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

document.addEventListener('DOMContentLoaded', () => {
  const mailingListForm = document.getElementById('mailingListForm');
  const formMessage = document.getElementById('formMessage');
  
  if (mailingListForm) {
    mailingListForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!supabase) {
        formMessage.innerText = 'Setup required: Add Supabase URL and Key to .env to enable the mailing list.';
        formMessage.style.color = '#facc15'; // yellow
        formMessage.style.display = 'block';
        return;
      }
      
      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const submitBtn = document.getElementById('submitBtn');
      
      submitBtn.innerText = 'Subscribing...';
      submitBtn.disabled = true;
      
      try {
        // Assuming your table is named 'mailing_list'
        const { data, error } = await supabase
          .from('mailing_list')
          .insert([{ name, email }]);
          
        if (error) throw error;
        
        formMessage.innerText = 'Thank you for joining the Foxx Den!';
        formMessage.style.color = '#22c55e'; // green
        formMessage.style.display = 'block';
        mailingListForm.reset();
      } catch (err) {
        console.error(err);
        formMessage.innerText = 'Something went wrong. Please try again or contact us directly.';
        formMessage.style.color = '#ef4444'; // red
        formMessage.style.display = 'block';
      } finally {
        submitBtn.innerText = 'Subscribe';
        submitBtn.disabled = false;
      }
    });
  }
});
