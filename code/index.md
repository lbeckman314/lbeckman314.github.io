---
title: code
---

<div class="container">
    {% for code in site.code %}
    <div class="fixed pointer featured">
        <a class="code-src" href="{{code.src}}"></a>
        <img class="center" src="/assets/images/{{code.img}}">
        <p class="code-title">{{code.name}}</p>
            <div class="type-container">
            {% for type in code.type %}
                <span class="code-type {{type}}">{{type}}</span>
            {% endfor %}
            </div>
        <p class="code">{{code.content}}</p>
    </div>
    {% endfor %}
</div>

# Interactive Demos

Feel free to try out some programs in an interactive sandbox. Click on any of the examples below to give them a spin.

{% include demonic.html command='prime 10101' %}
