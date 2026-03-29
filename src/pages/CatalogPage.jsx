import React from 'react';
import { RECIPES } from '../data/catalog';
import { Badge, Card, SectionHeading } from '../components/UI';
import { Container } from '../components/Layout';

export default function CatalogPage() {
  return (
    <section className="section section--page">
      <Container>
        <SectionHeading eyebrow="Menüler" title="Tariflerimiz" subtitle="Tarif yapısı tek düze değil; hedefe ve hassasiyete göre farklılaşır." />
        <div className="recipe-grid">
          {RECIPES.map((recipe) => (
            <Card key={recipe.id} className="recipe-card">
              <div className="recipe-card__top">
                <Badge tone="accent">{recipe.badge}</Badge>
                <strong>{recipe.name}</strong>
              </div>
              <p>{recipe.description}</p>
              <div className="chip-row">
                {recipe.ingredients.map((item) => <span className="chip" key={item}>{item}</span>)}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
