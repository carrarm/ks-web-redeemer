import { Component, computed, inject } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { AppState } from '@/core/app-state';
import { DatePipe } from '@angular/common';

interface HeaderData {
  logo: string;
  title: string;
  subtitle: string;
}

@Component({
  imports: [Icon, DatePipe],
  selector: 'ks-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly appState = inject(AppState);

  protected readonly content = computed(() => {
    const content: HeaderData = {
      logo: 'crown-shield',
      title: 'Kingshot redeemer',
      subtitle: 'Redeem gift codes for governors & alliances',
    };

    const alliance = this.appState.alliance();
    if (alliance) {
      content.logo = 'alliance-logo';
      content.title = `[${alliance.tag}] ${alliance.name}`;
      content.subtitle = `${alliance.roster.length} members`;
    }

    return content;
  });
}
