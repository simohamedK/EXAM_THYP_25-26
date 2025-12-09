<?php
namespace VoiceSearch;

use Omeka\Module\AbstractModule;
use Laminas\Mvc\MvcEvent;
use Laminas\ModuleManager\Feature\AutoloaderProviderInterface;

class Module extends AbstractModule implements AutoloaderProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    // fonction qui permet à Omeka de trouver les fichiers dans src/
    public function getAutoloaderConfig()
    {
        return [
            'Laminas\Loader\StandardAutoloader' => [
                'namespaces' => [
                    __NAMESPACE__ => __DIR__ . '/src',
                ],
            ],
        ];
    }

    public function onBootstrap(MvcEvent $event)
    {
        parent::onBootstrap($event);
        
        // Autoriser l'accès public à la page
        $services = $event->getApplication()->getServiceManager();
        $acl = $services->get('Omeka\Acl');
        $acl->allow(null, 'VoiceSearch\Controller\Index');
    }
}