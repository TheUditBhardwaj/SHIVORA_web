import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Products.css';

const Products = () => {
  useScrollReveal();

  const segments = [
    {
      id: "allopathic",
      title: "Allopathic Products",
      desc: "We facilitate sourcing and trading of a diverse range of quality-focused allopathic healthcare products through reliable manufacturing and distribution partners.",
      categories: [
        "Tablets", "Capsules", "Syrups", "Dry Syrups",
        "Injections", "External Preparations", "Topical Products",
        "General Healthcare Products", "Prescription / Ethical Products", "OTC Products"
      ]
    },
    {
      id: "ayurvedic",
      title: "Ayurvedic & Herbal Products",
      desc: "Our Ayurvedic portfolio focuses on traditional wellness products and herbal formulations sourced through established manufacturing partners.",
      categories: [
        "Ayurvedic Tablets", "Capsules", "Syrups", "Churnas & Powders",
        "Herbal Extracts", "Oils", "Proprietary Ayurvedic Formulations", "Herbal Wellness Products"
      ]
    },
    {
      id: "veterinary",
      title: "Veterinary Products",
      desc: "We support the animal healthcare market with a range of veterinary products and animal nutrition solutions through our manufacturing and distribution network.",
      categories: [
        "Veterinary Tablets", "Veterinary Bolus", "Veterinary Injections",
        "Veterinary Powders", "Veterinary Oral Liquids", "Feed Supplements", "Animal Health Products"
      ]
    },
    {
      id: "food",
      title: "Food & Natural Supplements",
      desc: "We source and trade food-grade natural ingredients, powders, blends and wellness-oriented products for businesses seeking dependable supply solutions.",
      categories: [
        "Natural Food Powders", "Herbal Powders", "Plant-based Ingredients",
        "Protein Products", "Health Mixes", "Functional Food Ingredients",
        "Superfood Products", "Natural Extracts", "Food Supplement Ingredients"
      ]
    },
    {
      id: "nutraceuticals",
      title: "Nutraceutical Products",
      desc: "Our nutraceutical portfolio includes nutrition and wellness products designed for diverse market requirements, supported by reliable manufacturing and sourcing partners.",
      categories: [
        "Vitamins", "Minerals", "Multivitamins", "Protein Supplements",
        "Botanical Supplements", "Herbal Extracts", "Functional Nutrition Products",
        "Sports Nutrition", "General Wellness Supplements"
      ]
    }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ background: 'rgba(16,185,129,0.2)', borderColor: 'rgba(16,185,129,0.3)', marginBottom: '1.5rem' }}>Catalogue</span>
          <h1>Our Product Segments</h1>
          <p>A comprehensive multi-category portfolio spanning healthcare, wellness, and veterinary markets.</p>
        </div>
      </div>

      <div className="container section products-container" style={{ paddingTop: '7rem' }}>
        {segments.map((segment, idx) => (
          <div className="product-section reveal" id={segment.id} key={idx} style={{ transitionDelay: `${idx * 0.08}s` }}>
            <div className="product-header">
              <h2>{segment.title}</h2>
              <p className="product-desc">{segment.desc}</p>
            </div>
            <div className="categories-grid">
              {segment.categories.map((cat, i) => (
                <div className="category-item" key={i}>
                  <CheckCircle2 size={20} className="check-icon" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
