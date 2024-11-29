<?php
ob_start();
?>
<div class="main-content app-content">
    <div class="container-fluid">
        <h1>Bienvenido a la página principal</h1>
        <p>Este es el contenido específico de la página de inicio.</p>
    </div>
</div>
<?php
$content = ob_get_clean();

include './layouts/main_content.php';
?>
