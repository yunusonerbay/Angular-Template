import { Component } from '@angular/core'

@Component({
    templateUrl: './transaction.component.html'
})

export class TransactionComponent {
  isLoading = true;
  showContent = false;

  ngOnInit() {
    // Simulate loading time
     this.loadData();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
