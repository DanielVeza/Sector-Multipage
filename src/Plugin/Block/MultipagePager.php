<?php

namespace Drupal\sector_multipage\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides the search api box block. Replicates the default search block design.
 *
 * @Block(
 *   id = "multipage_pager",
 *   admin_label = @Translation("Sector Multipage - Multipage pager"),
 *   category = @Translation("Sector Multipage"),
 * )
 */
class MultipagePager extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'multipage_pager',
    ];
  }
}

