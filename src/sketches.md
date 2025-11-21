---
title: "Sketches"
layout: "base.njk"
---

<div class="image-grid">
{% for item in sketches %}
<a href="{{ item.image }}" class="thumbnail-card" data-index="{{ forloop.index0 }}">
        {% imageOpt item.image, item.alt, "optimized-thumbnail" %}
    </a>
{% endfor %}
</div>

<div class="lightbox" id="image-lightbox">
    <button class="lightbox-btn close-btn" aria-label="Close image viewer">&times;</button>
    <button class="lightbox-btn prev-btn" aria-label="Previous image">&#10094;</button>
    <button class="lightbox-btn next-btn" aria-label="Next image">&#10095;</button>
    <div class="lightbox-content">
        <img src="" alt="" id="lightbox-img">
    </div>
</div>

<script src="/js/main.js" defer></script>