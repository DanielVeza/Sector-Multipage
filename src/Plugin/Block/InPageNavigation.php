<?php

namespace Drupal\sector_multipage\Plugin\Block;

use Drupal\Component\Utility\Html;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContextAwarePluginInterface;

/**
 * Provides the search api box block. Replicates the default search block design.
 *
 * @Block(
 *   id = "multipage_in_page_navigation",
 *   admin_label = @Translation("Sector Multipage - In page navigation"),
 *   category = @Translation("Sector Multipage"),
 *   context = {
 *     "node" = @ContextDefinition("entity:node")
 *   }
 * )
 */
class InPageNavigation extends BlockBase implements ContextAwarePluginInterface {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    /** @var \Drupal\Core\Entity\FieldableEntityInterface $entity */
    $entity = $this->getContextValue('node');
    $headings = [];
    if ($entity) {
      $body = $entity->body->getValue();
      $dom = Html::load($body[0]['value']);
      $body = $dom->getElementsByTagName('body');
      $nodeList = $body->item(0);
      $count = 1;
      foreach ($nodeList->childNodes as $node) {
        if ($node->nodeName == 'h2') {
          $headings[] = $node->nodeValue;
        }
      }
    }
    //dpm(['entity' => $entity]);
    $build = [
      '#theme' => 'multipage_in_page_navigation',
      '#headings' => $headings,
    ];
    return $build;
  }
}

