import React from 'react';

export const WhatsAppButton = ({
  phoneNumber = '919230374701',
  message = 'Hello House of Humour! I would like to know more about the shows and auditions.'
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Chat with House of Humour on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <div className="whatsapp-pulse-ring"></div>
      <svg
        className="whatsapp-icon-svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.65.766 5.12 2.088 7.216L2.6 30l7.02-1.942A13.43 13.43 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.62c-2.22 0-4.316-.62-6.11-1.7l-.438-.26-4.542 1.256 1.22-4.428-.286-.454A11.08 11.08 0 0 1 4.9 16c0-6.12 4.98-11.1 11.1-11.1 6.12 0 11.1 4.98 11.1 11.1 0 6.12-4.98 11.1-11.1 11.1zm6.09-8.326c-.334-.168-1.974-.974-2.28-1.086-.306-.112-.528-.168-.75.168-.222.334-.862 1.086-1.056 1.308-.194.222-.39.25-.724.084-.334-.168-1.41-.52-2.686-1.658-.992-.884-1.662-1.976-1.856-2.31-.194-.334-.02-.514.148-.68.15-.15.334-.39.5-.584.168-.194.222-.334.334-.556.112-.222.056-.418-.028-.584-.084-.168-.75-1.808-1.028-2.476-.272-.65-.548-.562-.75-.572l-.64-.012c-.222 0-.584.084-.89.418-.306.334-1.168 1.142-1.168 2.784 0 1.642 1.196 3.228 1.362 3.45.168.222 2.352 3.592 5.7 5.034.796.344 1.418.55 1.902.704.8.254 1.528.218 2.104.132.642-.096 1.974-.806 2.252-1.584.278-.778.278-1.444.194-1.584-.084-.14-.306-.222-.64-.39z" />
      </svg>
      <span className="whatsapp-label">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
