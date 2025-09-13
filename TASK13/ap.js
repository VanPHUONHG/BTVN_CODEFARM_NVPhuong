export function renderProducts(products, app) {
  app.innerHTML = `
    <style>
      body {
        background: linear-gradient(270deg, #ff0080, #7928ca, #00b4d8, #90e0ef);
        background-size: 600% 600%;
        animation: bgShift 12s ease infinite;
        font-family: 'Poppins', sans-serif;
      }

      @keyframes bgShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      table {
        border-collapse: collapse;
        width: 90%;
        margin: 40px auto;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,0,255,0.3);
        animation: glowPulse 3s infinite alternate;
      }

      @keyframes glowPulse {
        from { box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff; }
        to { box-shadow: 0 0 40px #00ffcc, 0 0 80px #ff00ff; }
      }

      th, td {
        padding: 15px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      th {
        background: linear-gradient(90deg, #ff00cc, #3333ff, #00ffee);
        background-size: 300% 300%;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 2px;
        animation: colorShift 5s linear infinite;
      }

      @keyframes colorShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      tr {
        transition: transform 0.3s, background 0.3s;
      }

      tr:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3);
      }

      td {
        color: #fff;
        font-size: 16px;
      }

      /* Container cho ảnh + khói */
      .img-box {
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: 12px;
      }

      .img-box img {
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        transition: transform 0.4s;
        position: relative;
        z-index: 1;
      }

      .img-box img:hover {
        transform: rotate(5deg) scale(1.2);
        box-shadow: 0 0 25px #ff00ff, 0 0 40px #00ffff;
      }

      /* Hiệu ứng khói */
      .img-box::after {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        animation: smokeMove 6s infinite linear;
        filter: blur(25px);
        opacity: 0.5;
        z-index: 2;
      }

      @keyframes smokeMove {
        0% { transform: translate(0,0) rotate(0deg); }
        50% { transform: translate(20px, -20px) rotate(45deg); }
        100% { transform: translate(0,0) rotate(360deg); }
      }
    </style>

    <table>
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Loại</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            (p) => `
            <tr>
              <td>
                <div class="img-box">
                  <img src="${p.url}" width="80"/>
                </div>
              </td>
              <td>${p.name}</td>
              <td>${p.type}</td>
              <td>$${p.price}</td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}
