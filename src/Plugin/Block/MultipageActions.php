<?php

namespace Drupal\sector_multipage\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the search api box block. Replicates the default search block design.
 *
 * @Block(
 *   id = "multipage_actions",
 *   admin_label = @Translation("Sector Multipage - Multipage actions"),
 *   category = @Translation("Sector Multipage"),
 * )
 */
class MultipageActions extends BlockBase{
  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'multipage_actions',
    ];;
  }
}

