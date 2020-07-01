function [returnV]= myFFT(inputV)
    N = numel(inputV);
    if(N == 1) %if only one sample, return this sample
        returnV = inputV;
    elseif(N ~= 1)
        Xeven = zeros(N/2); % Create an array of size N/2 for even samples
        Xodd = zeros(N/2); % Create an array of size N/2 for odd samples

        Xeven = inputV(1:2:end); %even indices values in even array 
        Xodd = inputV(2:2:end);  %odd indices values in odd array
        Xeven = myFFT(Xeven); 
        Xodd = myFFT(Xodd);
        W = 1;
        returnV = zeros([1 N]); %vector of size o.g. # samples
        for j = 1 : (N/2)
            returnV(j) = Xeven(j) + Xodd(j) * W;
            returnV(j + N/2) = Xeven(j) - Xodd(j) * W;
            W = exp((-2*pi*1i)/N)*W;
        end
    end
end