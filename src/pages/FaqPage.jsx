import React from 'react';
import { FAQS } from '../data/catalog';
import { Card, SectionHeading } from '../components/UI';
import { Container } from '../components/Layout';

export default function FaqPage() {
  return (
    <section className="section section--page">
      <Container>
        <SectionHeading eyebrow="SSS" title="Sık sorulan sorular" />
        <div className="stack-lg">
          {FAQS.map(([question, answer]) => (
            <Card key={question} className="faq-card">
              <h3>{question}</h3>
              <p>{answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
