import React from "react";

const companies = [
  // FAANG
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },

  // MANGA / MAMAA
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },

  // Other Tech Giants
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },

  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Intel_logo_%282020%2C_light_blue%29.svg" },

  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
  { name: "X", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" },
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Dropbox", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Dropbox_logo_2017.svg" },

  { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
  { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

// Duplicate for seamless infinite loop
const allCompanies = [...companies, ...companies];

const CompanyLogoCarousel = () => {
  return (
    <section className="py-14 bg-white">
      {/* Section Header */}
      <div className="text-center mb-8 px-4">
        <p className="text-sm font-semibold tracking-widest text-[#6A38C2] uppercase mb-2">
          Trusted by the world's best
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          Top Companies Hiring on{" "}
          <span className="gradient-text">JobPortal</span>
        </h2>
      </div>

      {/* Marquee Strip */}
      <div className="marquee-container py-4">
        <div className="animate-marquee">
          {allCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex flex-col items-center justify-center mx-8 group"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-100 group-hover:shadow-xl group-hover:border-purple-200 transition-all duration-300 group-hover:scale-110 p-3">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 object-contain transition-all duration-300"
                  onError={(e) => {
                    // Fallback: show company initial letter
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-[#6A38C2]">${company.name[0]}</span>`;
                  }}
                />
              </div>
              <span className="mt-2 text-xs font-medium text-gray-500 group-hover:text-[#6A38C2] transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mt-10 px-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent max-w-4xl mx-auto" />
      </div>
    </section>
  );
};

export default CompanyLogoCarousel;
