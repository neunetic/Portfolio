---
title: "Illustration Portfolio"
layout: "base.njk"
---

<div class="portfolio-grid">
{% for item in portfolio %}
<a href="{{ item.image }}" class="thumbnail-card" data-index="{{ forloop.index0 }}">
        <img src="{{ item.image }}" alt="{{ item.alt }}">
    </a>
{% endfor %}
</div>